import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20261123000005 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table if not exists "vendor_fulfillment_group" ("id" text not null, "vendor_id" text not null, "order_id" text not null, "status" text check ("status" in ('pending','processing','shipped','delivered','canceled','exception')) not null default 'pending', "carrier" text null, "tracking_number" text null, "tracking_url" text null, "shipped_at" timestamptz null, "delivered_at" timestamptz null, "canceled_at" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vendor_fulfillment_group_pkey" primary key ("id"));`
    )
    this.addSql(
      `create unique index if not exists "IDX_vendor_fulfillment_group_vendor_order" on "vendor_fulfillment_group" ("vendor_id", "order_id") where "deleted_at" is null;`
    )
    this.addSql(
      `create index if not exists "IDX_vendor_fulfillment_group_vendor_id" on "vendor_fulfillment_group" ("vendor_id") where "deleted_at" is null;`
    )
    this.addSql(
      `create index if not exists "IDX_vendor_fulfillment_group_order_id" on "vendor_fulfillment_group" ("order_id") where "deleted_at" is null;`
    )

    this.addSql(
      `create table if not exists "vendor_fulfillment_item" ("id" text not null, "group_id" text not null, "vendor_id" text not null, "order_id" text not null, "line_item_id" text not null, "product_id" text null, "quantity" integer not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vendor_fulfillment_item_pkey" primary key ("id"));`
    )
    this.addSql(
      `create unique index if not exists "IDX_vendor_fulfillment_item_order_line" on "vendor_fulfillment_item" ("order_id", "line_item_id") where "deleted_at" is null;`
    )
    this.addSql(
      `create index if not exists "IDX_vendor_fulfillment_item_vendor_id" on "vendor_fulfillment_item" ("vendor_id") where "deleted_at" is null;`
    )
    this.addSql(
      `create index if not exists "IDX_vendor_fulfillment_item_order_id" on "vendor_fulfillment_item" ("order_id") where "deleted_at" is null;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "vendor_fulfillment_item" cascade;`)
    this.addSql(`drop table if exists "vendor_fulfillment_group" cascade;`)
  }
}
