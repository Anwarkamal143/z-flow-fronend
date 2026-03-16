# EventFlow - Zapier-Like Automation Platform

![EventFlow Logo](./logo.png)

EventFlow is an **open-source, event-driven automation platform** inspired by Zapier. It allows you to create **custom workflows** that connect multiple apps and services using **triggers** and **actions**, all in a visual builder or through developer-friendly scripting.

---

## 🧠 Overview

EventFlow enables you to automate tasks like:

- Sending Slack notifications when a new user signs up
- Adding new customers to your CRM automatically
- Triggering follow-up emails after certain events
- Orchestrating multi-step, event-driven workflows

It combines **event streaming**, **background job processing**, and **workflow orchestration** into a scalable platform.

---

## 🏗️ Key Features

### 🔔 Triggers

- Capture events from APIs, webhooks, or internal sources
- Examples: `user.created`, `order.paid`, `file.uploaded`
- Sources: Webhooks, Kafka events, Cron jobs, third-party integrations

### ⚙️ Actions

- Tasks executed when a trigger fires
- Examples: Send email, post Slack message, update database, start another workflow
- Supports **delays, retries, and conditional execution**

### 🔄 Workflows

- Multi-step workflows with branching and delays
- Example:
  1. Trigger: `user.signup`
  2. Action: Create CRM record
  3. Action: Send Slack notification
  4. Delay: 3 days
  5. Action: Send follow-up email

### 📦 Connectors

- Modular integrations with external services (Slack, Gmail, Notion, GitHub, Stripe, etc.)
- Extendable via custom connectors

### 🔁 Queue & Retry System

- Uses **BullMQ** for job scheduling, retries, and background execution
- Supports delayed jobs, concurrency, and backoff strategies

### 📡 Event Streaming (Optional)

- Use **Kafka** or **NATS** for real-time, distributed event streaming
- Enables multi-service event-driven architecture

### 🧩 Workflow Engine

- Built with Node.js + TypeScript
- Orchestrates execution with Redis/BullMQ and PostgreSQL
- Handles retries, error logging, and state management

### 🖥️ Frontend (Visual Builder)

- React + TypeScript-based drag-and-drop workflow editor
- Real-time logs and metrics
- OAuth2 integration for third-party apps

---

## 🧰 Tech Stack

| Layer          | Technology                                 |
| -------------- | ------------------------------------------ |
| Frontend       | React, TypeScript, React Flow              |
| Backend        | Node.js, Express/Hono, TypeScript          |
| Job Queue      | BullMQ + Redis                             |
| Event Bus      | Kafka / NATS / Redis Streams               |
| Database       | PostgreSQL / Prisma ORM                    |
| Authentication | JWT + OAuth2                               |
| Deployment     | Docker, Kubernetes, AWS ECS                |
| Integrations   | Slack, Gmail, Notion, GitHub, Stripe, etc. |

---

## ⚙️ Example Workflow (Code)

```ts
import { Workflow, Trigger, Action } from './core'

export const userSignupFlow = new Workflow({
  name: 'User Signup Workflow',
  trigger: Trigger.event('user.signup'),
  actions: [
    Action.run('Send Slack Notification', async ({ data }) => {
      await slack.sendMessage(`#signups`, `🎉 New signup: ${data.email}`)
    }),
    Action.delay('Wait 3 days'),
    Action.run('Send Follow-up Email', async ({ data }) => {
      await email.send({
        to: data.email,
        subject: 'How’s it going?',
        text: 'We noticed you joined a few days ago. Need help?',
      })
    }),
  ],
})
```
# z-flow-fronend
