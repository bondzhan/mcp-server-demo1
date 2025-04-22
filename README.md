# MCP 时间服务器示例 (MCP Time Server Demo)

这是一个简单的基于模型上下文协议 (MCP) 的服务器示例，使用 TypeScript 和 `@modelcontextprotocol/sdk` 构建。

它提供了一个工具，用于获取当前时间，并可以选择性地指定时区。

## 初始构建提示 (Initial Build Prompt)

### 需求

基于提供的 MCP 相关资料，帮我构建一个 MCP Server，需求如下：

- 提供一个获取当前时间的工具
- 接收时区作为参数（可选）
- 编写清晰的注释和说明
- 要求功能简洁、只包含关键功能
- 使用 TypeScript 编写

请参考下面四个资料：

### [参考资料 1] MCP 基础介绍

- 粘贴 https://modelcontextprotocol.io/introduction 里的内容。

### [参考资料 2] MCP 核心架构

- 粘贴 https://modelcontextprotocol.io/docs/concepts/architecture 里的内容。

### [参考资料 3] MCP Server 开发指引

- 粘贴 https://modelcontextprotocol.io/quickstart/server 里的内容。

### [参考资料 4] MCP Typescript SDK 文档

- 粘贴 https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md 里的内容。


## 功能特点

*   **`getCurrentTime` 工具**: 获取当前时间。
    *   支持可选的 `timezone` 参数 (IANA 时区标识符，例如 `America/New_York`, `Asia/Shanghai`)。
    *   如果未提供时区或时区无效，则返回服务器本地时间。
*   **MCP 兼容**: 可以与任何支持 MCP 的客户端（如 Claude Desktop 或 MCP Inspector）集成。
*   **基于 Stdio**: 使用标准输入/输出进行通信，易于集成。

## 先决条件

*   [Node.js](https://nodejs.org/) (建议使用 LTS 版本)
*   [npm](https://www.npmjs.com/) (通常随 Node.js 一起安装)

## 安装

1.  克隆或下载此仓库。
2.  在项目根目录打开终端，运行以下命令安装依赖项：
    ```bash
    npm install
    ```

## 使用

### 1. 编译项目

由于项目使用 TypeScript 编写，需要先将其编译为 JavaScript：

```bash
npm run build
```
### 2. 运行服务器
```bash
npm start
```

## 使用 MCP Inspector 测试 (Testing with MCP Inspector)
1.  下载并安装 [MCP Inspector](URL_ADDRESS.com/modelcontextprotocol/mcp-inspector)。
2.  启动 MCP Inspector。
3.  在 MCP Inspector 中创建一个新的 MCP 会话。
4.  在 MCP Inspector 中，选择 `Tools` -> `Import Tool`，然后选择 `tools/getCurrentTime.ts`。
5.  点击 `Import` 按钮，然后在 `Tools` 列表中找到 `getCurrentTime` 工具。
6.  点击 `getCurrentTime` 工具，然后点击 `Run` 按钮。
7.  查看输出结果。


## 贡献
欢迎贡献！请在 `issues` 或 `pull requests` 中提出问题或建议。