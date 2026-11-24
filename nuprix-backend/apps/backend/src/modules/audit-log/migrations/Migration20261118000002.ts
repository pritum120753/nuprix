import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20261118000002 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table if not exists "audit_log" ("id" text not null, "actor_id" text null, "actor_type" text not null default 'user', "action" text not null, "resource_type" text not null, "resource_id" text not null, "before_state" jsonb null, "after_state" jsonb null, "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "audit_log_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_audit_log_resource" ON "audit_log" ("resource_type", "resource_id") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_audit_log_actor_id" ON "audit_log" ("actor_id") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_audit_log_deleted_at" ON "audit_log" ("deleted_at") WHERE deleted_at IS NULL;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "audit_log" cascade;`)
  }
}
