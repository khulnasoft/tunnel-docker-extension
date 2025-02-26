![Docker Pulls](https://img.shields.io/docker/pulls/khulnasoft/tunnel-docker-extension?style=flat-square)
![Latest Tagged Release](https://img.shields.io/github/v/tag/khulnasoft/tunnel-docker-extension?style=flat-square)

# 🚀 Tunnel Docker Extension

## 🔍 What is this?

Docker has introduced **Extensions** to enhance Docker Desktop. The **Tunnel Docker Extension** allows users to run **Tunnel** and receive formatted, insightful results.

### ✨ Features:
- 📌 Select images from a dropdown or enter manually
- 📊 Scan and retrieve results instantly
- 📜 Option to export results in **SBOM format**
- 🔄 Works within Docker Desktop as an extension

## 🛠 How does it work?

The extension runs in its own container with a **React-based web interface** that interacts with the Docker Extension API.

### 🔧 Workflow:
1️⃣ Specify an image to scan  
2️⃣ Create the tunnel cache volume (if it doesn’t exist)  
3️⃣ Run `khulnasoft/tunnel` against the image, using `docker.sock` and the cache volume  
4️⃣ Process JSON results and render output  

## 🏗 What is it made of?

The extension is built with:
- 🖥 **React** frontend leveraging **Material UI**
- 🐳 **Docker Extension API**
- 🏗 **Typescript** components for structured rendering

### 📁 Component Breakdown:

| Component | Purpose |
|-----------|---------|
| [DefaultDisplay](client/src/DefaultDisplay.tsx) | Main view after scanning, includes search box & logo |
| [ImageList](client/src/ImageList.tsx) | Loads local images & provides autocomplete |
| [Links](client/src/Links.tsx) | Header links (GitHub, Docs, Slack) |
| [Loading](client/src/Loading.tsx) | Spinner overlay during processing |
| [Pill](client/src/Pill.tsx) | Colored badges denoting vulnerability severity |
| [Success](client/src/Success.tsx) | 🎉 Message when no vulnerabilities are found |
| [Vulns](client/src/Vulns.tsx) | Renders results accordion-style |
| [VulnsFilter](client/src/VulnsFilter.tsx) | Provides severity-based filtering |
| [Welcome](client/src/Welcome.tsx) | Landing page with Tunnel description & initial scan |

🔹 Additionally, the **[TunnelVulnerability](client/src/TunnelVulnerability.tsx)** class represents vulnerability data from JSON results.

## 🚀 Getting Started

### 📌 Prerequisites

Ensure you have:
- ✅ Docker Desktop (with Extensions support)
- ✅ Docker Extension binary
- ✅ **NPM** installed

## 🏗 Local Development

### 🔄 Deploy to Docker Desktop

#### Linux / macOS:
```bash
make deploy-dev
```

#### Windows:
```bash
make.bat deploy-dev
```

### 🐞 Enable Debugging in Docker Desktop

#### Linux / macOS:
```bash
make dev-debug
```

#### Windows:
```bash
make.bat dev-debug
```

### ❌ Disable Debugging

#### Linux / macOS:
```bash
make dev-reset
```

#### Windows:
```bash
make.bat dev-reset
```

## 🚀 CI/CD Process

🔹 On a **new tag release**, a multi-arch build (`linux/amd64` & `linux/arm64`) is triggered via `docker buildx`.

🔹 The **[release-extension](Makefile)** target in the `Makefile` manages this process efficiently.

🔹 **GitHub Actions** ensures smooth deployment, including **QEMU installation** for cross-architecture compatibility.

---

📌 **Follow us for updates** 📌  
🔗 [GitHub](https://github.com/khulnasoft/tunnel-docker-extension) | 📖 [Documentation](https://docs.khulnasoft.com) | 💬 [Slack](https://khulnasoft.slack.com)

