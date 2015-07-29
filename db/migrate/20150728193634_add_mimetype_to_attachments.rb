class AddMimetypeToAttachments < ActiveRecord::Migration
  def change
    add_column :attachments, :mime_type, :string
  end
end
