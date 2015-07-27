class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.string :name
      t.string :description
      t.string :organization_type
      t.string :address
      t.string :telephone

      t.timestamps null: false
    end
  end
end
