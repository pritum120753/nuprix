import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20261118000003 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table if not exists "support_ticket" ("id" text not null, "customer_id" text null, "email" text not null, "name" text null, "order_id" text null, "category" text check ("category" in ('general', 'order', 'digital_download', 'refund', 'other')) not null default 'general', "subject" text not null, "message" text not null, "status" text check ("status" in ('open', 'in_progress', 'resolved', 'closed')) not null default 'open', "admin_note" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "support_ticket_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_support_ticket_customer_id" ON "support_ticket" ("customer_id") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_support_ticket_order_id" ON "support_ticket" ("order_id") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_support_ticket_status" ON "support_ticket" ("status") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_support_ticket_deleted_at" ON "support_ticket" ("deleted_at") WHERE deleted_at IS NULL;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "support_ticket" cascade;`)
  }
}
