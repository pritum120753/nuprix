import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20261123000006 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "vendor_payout" add column if not exists "payout_method" text check ("payout_method" in ('bank_transfer', 'bkash', 'nagad', 'rocket')) null;`
    )
    this.addSql(
      `alter table "vendor_payout" add column if not exists "bank_name" text null;`
    )
    this.addSql(
      `alter table "vendor_payout" add column if not exists "account_name" text null;`
    )
    this.addSql(
      `alter table "vendor_payout" add column if not exists "account_number" text null;`
    )
    this.addSql(
      `alter table "vendor_payout" add column if not exists "mobile_number" text null;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "vendor_payout" drop column if exists "mobile_number";`
    )
    this.addSql(
      `alter table "vendor_payout" drop column if exists "account_number";`
    )
    this.addSql(
      `alter table "vendor_payout" drop column if exists "account_name";`
    )
    this.addSql(
      `alter table "vendor_payout" drop column if exists "bank_name";`
    )
    this.addSql(
      `alter table "vendor_payout" drop column if exists "payout_method";`
    )
  }
}
