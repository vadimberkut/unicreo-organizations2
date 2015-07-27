class Organization < ActiveRecord::Base
  has_many :attachments, :dependent => :destroy

  validates :name, :description, :organization_type, :address, :telephone, presence: true

  def as_json(options = {})
    super(options.merge(include: :attachments))
  end
end
