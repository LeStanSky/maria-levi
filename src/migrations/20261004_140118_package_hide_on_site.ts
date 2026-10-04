import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_packages" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_services_v_version_packages" ADD COLUMN "hide_on_site" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_packages" DROP COLUMN "hide_on_site";
  ALTER TABLE "_services_v_version_packages" DROP COLUMN "hide_on_site";`)
}
