import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20261118000004 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table if not exists "vendor_earning" ("id" text not null, "vendor_id" text not null, "order_id" text not null, "line_item_id" text not null, "currency_code" text not null, "gross_amount" integer not null, "commission_rate_bps" integer not null, "platform_fee" integer not null, "vendor_net" integer not null, "status" text check ("status" in ('pending', 'available', 'reversed')) not null default 'available', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vendor_earning_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_vendor_earning_line_item_unique" ON "vendor_earning" ("line_item_id") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_vendor_earning_vendor_id" ON "vendor_earning" ("vendor_id") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_vendor_earning_order_id" ON "vendor_earning" ("order_id") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_vendor_earning_deleted_at" ON "vendor_earning" ("deleted_at") WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `create table if not exists "vendor_payout" ("id" text not null, "vendor_id" text not null, "amount" integer not null, "currency_code" text not null, "status" text check ("status" in ('requested', 'approved', 'paid', 'rejected')) not null default 'requested', "reference" text null, "admin_note" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vendor_payout_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_vendor_payout_vendor_id" ON "vendor_payout" ("vendor_id") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_vendor_payout_deleted_at" ON "vendor_payout" ("deleted_at") WHERE deleted_at IS NULL;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "vendor_payout" cascade;`)
    this.addSql(`drop table if exists "vendor_earning" cascade;`)
  }
}
