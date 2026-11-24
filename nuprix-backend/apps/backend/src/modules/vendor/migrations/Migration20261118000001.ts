import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20261118000001 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table if not exists "vendor" ("id" text not null, "name" text not null, "handle" text not null, "contact_email" text not null, "status" text check ("status" in ('pending', 'verified', 'suspended')) not null default 'pending', "description" text null, "commission_rate_bps" integer null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vendor_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_vendor_handle_unique" ON "vendor" ("handle") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_vendor_deleted_at" ON "vendor" ("deleted_at") WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `create table if not exists "vendor_member" ("id" text not null, "vendor_id" text not null, "user_id" text not null, "email" text not null, "role" text check ("role" in ('owner', 'staff')) not null default 'owner', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vendor_member_pkey" primary key ("id"), constraint "vendor_member_vendor_id_foreign" foreign key ("vendor_id") references "vendor" ("id") on update cascade on delete cascade);`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_vendor_member_user_id" ON "vendor_member" ("user_id") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_vendor_member_deleted_at" ON "vendor_member" ("deleted_at") WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `create table if not exists "vendor_product" ("id" text not null, "vendor_id" text not null, "product_id" text not null, "approval_status" text check ("approval_status" in ('draft', 'pending_review', 'approved', 'rejected')) not null default 'pending_review', "rejection_reason" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vendor_product_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_vendor_product_product_id_unique" ON "vendor_product" ("product_id") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_vendor_product_vendor_id" ON "vendor_product" ("vendor_id") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_vendor_product_deleted_at" ON "vendor_product" ("deleted_at") WHERE deleted_at IS NULL;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "vendor_product" cascade;`)
    this.addSql(`drop table if exists "vendor_member" cascade;`)
    this.addSql(`drop table if exists "vendor" cascade;`)
  }
}
