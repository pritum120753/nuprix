import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261114003242 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "download_entitlement" drop constraint if exists "download_entitlement_token_hash_unique";`);
    this.addSql(`create table if not exists "digital_file" ("id" text not null, "product_id" text not null, "title" text not null, "file_key" text not null, "file_name" text not null, "mime_type" text null, "size_bytes" integer null, "license_note" text null, "max_downloads" integer not null default 5, "expires_after_days" integer null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "digital_file_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_digital_file_deleted_at" ON "digital_file" ("deleted_at") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_digital_file_product_id" ON "digital_file" ("product_id") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "download_entitlement" ("id" text not null, "order_id" text not null, "customer_id" text null, "email" text not null, "digital_file_id" text not null, "token_hash" text not null, "max_downloads" integer not null default 5, "download_count" integer not null default 0, "expires_at" timestamptz null, "revoked_at" timestamptz null, "last_downloaded_at" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "download_entitlement_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_download_entitlement_token_hash_unique" ON "download_entitlement" ("token_hash") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_download_entitlement_deleted_at" ON "download_entitlement" ("deleted_at") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_download_entitlement_order_id" ON "download_entitlement" ("order_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_download_entitlement_digital_file_id" ON "download_entitlement" ("digital_file_id") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "digital_file" cascade;`);

    this.addSql(`drop table if exists "download_entitlement" cascade;`);
  }

}
