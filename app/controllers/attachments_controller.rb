class AttachmentsController < ApplicationController

  def create
    name = params[:file].original_filename
    name = "#{params[:organization_id]}_" << name

    organization = Organization.find(params[:organization_id])
   # attachment = organization.attachments.create(attachment_params)
   attachment = organization.attachments.create(name: name, organization: organization)
   # Attachment.create(name: name, organization: organization )

    directory = "public"
    path = File.join(directory, name)
    File.open(path, "wb") { |f| f.write(params[:file].read) }

    #respond_with organization, attachment
  end

  def destroy

  end

  def attachment_params
    params.require(:attachment).permit(:name)
  end
end
