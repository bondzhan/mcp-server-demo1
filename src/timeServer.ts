import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 创建 MCP 服务器实例
const server = new McpServer({
  name: "TimeServer", // 服务器名称
  version: "1.0.0" // 服务器版本
});

// 定义 'getCurrentTime' 工具
// 这个工具用于获取当前时间，可以选择性地指定时区
server.tool(
  "getCurrentTime", // 工具名称
  "根据时区（可选）获取当前时间", // 工具描述
  {
    // 定义输入参数的 schema，使用 zod 进行校验
    // timezone 是一个可选的字符串参数
    timezone: z
      .string()
      .optional()
      .describe(
        "时区，例如 'Asia/Shanghai', 'America/New_York' 等（如不提供，则使用系统默认时区）"
      ),
  },
  async ({ timezone }) => {
    try {
      // 获取当前日期对象
      const now = new Date();
      let timeString: string;

      // 检查是否提供了时区参数
      if (timezone) {
        // 如果提供了时区，使用 Intl.DateTimeFormat 来格式化时间
        // 这需要 Node.js 编译时包含完整的 ICU 数据 (full-icu)
        // 或者在运行时环境中可用
        try {
          timeString = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false, // 使用 24 小时制
            timeZoneName: 'short' // 显示时区简称
          }).format(now);
        } catch (error) {
          // 如果时区无效或 Intl 不支持，则抛出错误
          console.error(`Invalid timezone provided: ${timezone}`, error);
          throw new Error(`Invalid or unsupported timezone: ${timezone}`);
        }
      } else {
        // 如果没有提供时区，使用本地时间
        // 使用 toLocaleTimeString() 获取本地时间字符串
        timeString = now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false // 使用 24 小时制
        });
      }

      // 返回结果，格式符合 MCP 规范
      return {
        content: [
          {
            type: "text",
            text: `Current time${timezone ? ' in ' + timezone : ''}: ${timeString}`
          }
        ]
      };
    } catch (error: any) {
      // 处理执行过程中的错误
      console.error("Error executing getCurrentTime tool:", error);
      // 返回错误信息给 MCP 客户端
      return {
        content: [
          {
            type: "text",
            text: `Error getting time: ${error.message}`
          }
        ]
      };
    }
  }
);

// 主函数，用于启动服务器
async function main() {
  console.log("Starting MCP Time Server...");
  // 创建标准输入/输出传输层实例
  const transport = new StdioServerTransport();
  // 将服务器连接到传输层，开始监听消息
  await server.connect(transport);
  console.log("MCP Time Server connected via stdio.");
}

// 执行主函数
main().catch(error => {
  console.error("Failed to start MCP Time Server:", error);
  process.exit(1);
});