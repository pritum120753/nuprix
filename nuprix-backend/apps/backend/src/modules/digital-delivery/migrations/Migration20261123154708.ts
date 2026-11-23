import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261123154708 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "download_entitlement" drop constraint if exists "download_entitlement_license_key_hash_unique";`);
    this.addSql(`create table if not exists "download_event" ("id" text not null, "entitlement_id" text not null, "occurred_at" timestamptz not null, "ip_hash" text not null, "user_agent" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "download_event_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_download_event_deleted_at" ON "download_event" ("deleted_at") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_download_event_entitlement_id" ON "download_event" ("entitlement_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_download_event_occurred_at" ON "download_event" ("occurred_at") WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "digital_file" add column if not exists "generate_license_key" boolean not null default false;`);

    this.addSql(`alter table if exists "download_entitlement" add column if not exists "license_key_encrypted" text null, add column if not exists "license_key_hash" text null;`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_download_entitlement_license_key_hash_unique" ON "download_entitlement" ("license_key_hash") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "download_event" cascade;`);

    this.addSql(`alter table if exists "digital_file" drop column if exists "generate_license_key";`);

    this.addSql(`drop index if exists "IDX_download_entitlement_license_key_hash_unique";`);
    this.addSql(`alter table if exists "download_entitlement" drop column if exists "license_key_encrypted", drop column if exists "license_key_hash";`);
  }

}
