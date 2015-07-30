class OrganizationsController < ApplicationController

  before_filter :authenticate_user!, only: [:create, :update, :destroy]

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

      path = File.join( ENV['attachments_store_directory'], attachment.name )

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