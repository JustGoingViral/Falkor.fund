# 🟩 XEmerald.com – Tokenized Real Estate Investment Platform

**XEmerald.com** is a web-based simulation platform designed to educate and visualize how blockchain enables fractional ownership of large-scale real estate developments. This MVP showcases flagship projects of the Falkor Fund: **Emerald Island** and **GREENPORT**.

---

## 🌍 Project Objective

To simulate tokenized investment in real estate using blockchain principles — demonstrating accessibility, liquidity, and growth potential in a user-friendly and interactive environment.

---

## 🏗️ Core MVP Components

### 🔧 1. Technology Stack

#### Frontend
- **React**: Component-based architecture for maintainability and scalability.
- **Tailwind CSS + Shadcn UI**: Modern, responsive styling with pre-built components.
- **Chart.js**: Financial visualizations and IRR projections.
- **Web3.js**: Blockchain simulation interface.
- **React Testing Library**: Frontend component testing.

#### Backend
- **Node.js + Express**: REST API and server-side logic.
- **In-Memory Storage**: Temporary data persistence for sessions and token balances.
- **Mock ERC-20 Token Contract**: Simulated blockchain behavior.
- **Jest**: Backend and API integration testing.
- **JSDoc**: Developer-facing documentation.

---

## 🧩 3. Key Features

### 🏠 Home Page
- **Intro to Tokenized Real Estate**: Benefits like liquidity, transparency, and global access.
- **Falkor Fund Overview**: Details on Emerald Island and GREENPORT.
- **Fractional Ownership Diagram**: Visual explanation of token-to-property mapping.
- **Interactive User Guide**: Onboarding for first-time users.

### 🏢 Property Listings

#### 🟢 Emerald Island
- Size: 1,053 acres  
- Development: 55,000 multifamily units  
- Phase I Cost: $14.26 billion  
- Projected IRR: 10–12%  
- Details: Investment highlights, placeholder visuals, and asset description

#### ✈️ GREENPORT Airport
- Size: 5,426 acres  
- Build-out Cost: $1.028 billion  
- Features: 10,000 ft runway, tech center  
- Details: Stock images, specifications, potential returns

---

### 💸 Token Purchase Simulation
- **"Emeralds" Token Input**: Simulates token purchases (e.g., $100 = 10 Emeralds)
- **Blockchain Interface**: No real chain or wallet needed
- **Confirmation Receipts**: Simulated transaction outcomes
- **Error Handling**: Educational disclaimers (e.g., “This is a simulation only”)

---

### 👛 Wallet Dashboard
- **Holdings Overview**: Simulated Emeralds token balance
- **Value Visualization**: Projected IRR charts (10–12%)
- **Charts**: Interactive charts via Chart.js
- **Portfolio Pie Chart**: Allocation across projects
- **Mock Transaction History**: Purchase log and timestamps

---

### 📚 Educational Content
- **Pop-up Walkthroughs**: Explains concepts interactively
- **Tooltips**: Contextual definitions (e.g., “What is tokenization?”)
- **Blockchain 101**: Beginner-friendly modules
- **Quantum-Resistant Encryption Visualization**: Stylized future-proofing concept

---

## 🧪 5. Testing Strategy
- **Unit Testing**: Components like property cards and token forms
- **Integration Testing**: Simulated blockchain flows
- **End-to-End Testing**: User walkthroughs from homepage to wallet
- **Mock Blockchain Verification**: Ensures logic accuracy without testnet
- **Scenario Logging**: Test plans, results, and coverage reports

---

## 📄 6. Documentation
- **Inline Docs**: All logic and modules include JSDoc annotations
- **API Docs**: Documented endpoints like:
  - `POST /api/purchase`
  - `GET /api/wallet`
- **User Guide**: Step-by-step navigation instructions
- **Developer Notes**: Future-proofing, architecture decisions, and sim logic

---

## 📜 License

This project is licensed under the **GNU General Public License v3.0**.  
See the [LICENSE](https://www.gnu.org/licenses/gpl-3.0.en.html) for full details.

---

## 🚀 Vision

> “XEmerald exists to empower everyday users to understand and engage in tokenized real estate — unlocking access to opportunities traditionally reserved for institutions.”

---

**Built with 💎 by the XEmerald Team.**
