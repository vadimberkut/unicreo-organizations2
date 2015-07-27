class OrganizationsController < ApplicationController

  def index
    respond_with Organization.all
  end

  def show
    respond_with Organization.find(params[:id])
  end

  def create
    respond_with Organization.create(organization_params)
  end

  def update
    organization = Organization.find(params[:id])
    organization.update(organization_params)
    respond_with organization
  end

  def destroy
    organization = Organization.find(params[:id])

    organization.attachments.each do |attachment|
      img_name = attachment.name
      img_directory = "#{Rails.root}/public/"
      path = img_directory << img_name

      if(File.exist?(path))
        File.delete(path)
      end
    end

    organization.destroy

    respond_with {}
  end

  private
  def organization_params
    params.require(:organization).permit(:name, :description, :organization_type, :address, :telephone)
  end
end
