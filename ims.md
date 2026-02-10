
## SPRINT 0 — BACKEND FOUNDATION (MANDATORY)

**Goal:** Project can run, authenticate, and be extended safely.

**DO THIS NOW**

* Initialize backend project
* Environment config (`.env`, config loader)
* Database connection
* Global error handler
* Request logger
* API versioning (`/api/v1`)
* Health check endpoint
* Base response format (success/error)

**Deliverable:**
Backend boots, DB connects, Postman can hit `/health`

---

## SPRINT 1 — AUTH + TENANT ISOLATION

**Goal:** Every request knows *who* and *which organization*.

**DO THIS NOW**

* Create `Organization` (or Company / Store / School)
* Create `User` model
* Roles (`SUPER_ADMIN`, `ORG_ADMIN`, `STAFF`)
* JWT authentication
* Login / logout
* Token refresh (if needed)
* Middleware:

  * `verifyToken`
  * `requireRole`
  * `requireOrganization`
* Enforce `organizationId` in all protected routes

**Deliverable:**
No API works without auth + org context

---

## SPRINT 2 — CORE INVENTORY MODELS

**Goal:** Inventory data structure is locked.

**DO THIS NOW**

* Create models:

  * `Category`
  * `Unit` (kg, pcs, liter, box)
  * `Item`
  * `Warehouse / Store`
* Enforce:

  * `organizationId` on all models
  * Soft delete (`deletedAt`)
* Indexing for search & performance
* Unique constraints (SKU, item code per org)

**Deliverable:**
Data schema finalized and stable

---

## SPRINT 3 — STOCK MANAGEMENT ENGINE

**Goal:** Inventory quantity is always correct.

**DO THIS NOW**

* Create `Stock` model
* Stock per:

  * Item
  * Warehouse
* APIs:

  * Get current stock
  * Stock summary per warehouse
* Prevent negative stock (configurable)
* Atomic stock updates (transaction-safe)

**Deliverable:**
System can tell **exact stock at any moment**

---

## SPRINT 4 — INVENTORY TRANSACTIONS (CRITICAL)

**Goal:** Every stock change is traceable.

**DO THIS NOW**

* Create `InventoryTransaction` model:

  * IN
  * OUT
  * TRANSFER
  * ADJUSTMENT
* APIs:

  * Stock in
  * Stock out
  * Transfer between warehouses
  * Manual adjustment
* Auto-update stock on transaction
* Transaction audit trail

**Deliverable:**
You can explain *why* stock changed, always

---

## SPRINT 5 — SUPPLIERS & PURCHASE FLOW

**Goal:** Inventory inflow is structured.

**DO THIS NOW**

* Create `Supplier` model
* Create `PurchaseOrder`
* Purchase statuses:

  * DRAFT
  * ORDERED
  * RECEIVED
  * PARTIAL
* Receiving items updates stock
* Price & cost tracking

**Deliverable:**
Stock can come from real suppliers

---

## SPRINT 6 — SALES / CONSUMPTION FLOW

**Goal:** Inventory outflow is controlled.

**DO THIS NOW**

* Create `Customer` (optional)
* Create `SalesOrder / IssueSlip`
* Deduct stock on approval
* Prevent overselling
* Record cost vs selling price

**Deliverable:**
Stock leaves system legally and traceably

---

## SPRINT 7 — ALERTS & RULES

**Goal:** System warns before damage happens.

**DO THIS NOW**

* Low stock thresholds
* Expiry date support (if applicable)
* Reorder level per item
* Notification triggers (email/webhook placeholder)

**Deliverable:**
Inventory problems are seen early

---

## SPRINT 8 — REPORTING & EXPORTS

**Goal:** Data becomes business insight.

**DO THIS NOW**

* Stock valuation report
* Movement report
* Supplier purchase report
* Dead stock report
* CSV / Excel export APIs

**Deliverable:**
Accountants & management are happy

---

## SPRINT 9 — SECURITY, PERFORMANCE & HARDENING

**Goal:** Production-ready backend.

**DO THIS NOW**

* Rate limiting
* Permission matrix per role
* API pagination & filtering
* Input validation everywhere
* Query optimization
* Backup strategy hooks

**Deliverable:**
Safe, fast, scalable backend

---

## SPRINT 10 — API FREEZE & DOCUMENTATION

**Goal:** Frontend + Mobile devs can build safely.

**DO THIS NOW**

* Swagger / OpenAPI docs
* Final API version lock
* Sample payloads
* Error codes documented

**Deliverable:**
Backend is officially consumable

---

## FINAL BUILD ORDER (ONE-LINE)

```
Foundation → Auth → Models → Stock Engine → Transactions → Purchase → Sales → Alerts → Reports → Hardening → Docs
```


