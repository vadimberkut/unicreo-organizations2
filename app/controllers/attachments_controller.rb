class AttachmentsController < ApplicationController

  def create
    attachment_name = "#{params[:organization_id]}_" + "#{params[:file].original_filename}"

    organization = Organization.find(params[:organization_id])
    attachment = organization.attachments.create(name: attachment_name)

    path = File.join( ENV['attachments_store_directory'], attachment_name )
    File.open(path, "wb") { |f| f.write(params[:file].read) }

    respond_with organization, attachment
  end

  def destroy

  end

  def attachment_params
    params.require(:attachment).permit(:name)
  end
end
