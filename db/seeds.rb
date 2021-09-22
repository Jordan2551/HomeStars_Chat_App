# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Create channels to facilitate channel flow
channels = Channel.create(
[
    {name: "Appliance Repair", image: "https://i.picsum.photos/id/181/200/200.jpg?hmac=hxgS3WEn2EsuxbTrdq37OVbnajtIHlPXzTKW0X_Gu-s"},
    {name: "Plumbing Repair", image: "https://i.picsum.photos/id/1082/200/200.jpg?hmac=3usO1ziO7kCseIG52ruhRigxyk39W_L9eECWe1Hs6fY"},
    {name: "Electrical Repair", image: "https://i.picsum.photos/id/71/200/200.jpg?hmac=TxuNm2jDRRNlSKPRxG7HH5vT63Bl20fD7M81shzv45M"},
    {name: "Moving Services", image: "https://i.picsum.photos/id/69/200/200.jpg?hmac=njzy58--eKh-4zqh3qk1_ath7No2-VIReYjWSjxn50M"},
    {name: "Roofing Repair", image: "https://i.picsum.photos/id/558/200/200.jpg?hmac=tFHyh9KzOASFBog3Hpj6oSkBkBr90f67Yuejl0XnFDM"},
    {name: "Heating and Cooling Repair", image: "https://i.picsum.photos/id/167/200/200.jpg?hmac=sv_8nQnuUO9QJ47YNgjG2iTmSnnzYA2ysw8JrvD5OTk"},
    {name: "Kitchen Services", image: "https://i.picsum.photos/id/330/200/200.jpg?hmac=Qo-hwVGhetTRMtlg4NE-HSzGQmvEC4vPxFFp3foXOHM"},
    {name: "Landscaping Services", image: "https://i.picsum.photos/id/447/200/200.jpg?hmac=CwQWs2SxtAz87GyTTmC1s4okk4869xQiZAfx7rPW0FM"}
])

# Create channels to facilitate user flow
users = User.create(
[
    {email: "sodales.at@porttitortellus.org", password: "gVOnJJOYp56N3sOi", password_confirmation: "gVOnJJOYp56N3sOi"},
    {email: "ornare.lectus@nuncacsem.ca", password: "CmriFIWXV3GFInTX", password_confirmation: "CmriFIWXV3GFInTX"},
    {email: "magna@lectus.net", password: "744HRlwEWf2Sk5se", password_confirmation: "744HRlwEWf2Sk5se"},
    {email: "eros@fuscedolor.co.uk", password: "CJAfl8vMXr0iT3xe", password_confirmation: "CJAfl8vMXr0iT3xe"},
    {email: "ultricies@tuermauris.ca", password: "wXlUmOjXk6WnPwYi", password_confirmation: "wXlUmOjXk6WnPwYi"},
    {email: "sed.dictum@penatibuset.edu", password: "tGLMHPSMogw9u2Rr", password_confirmation: "tGLMHPSMogw9u2Rr"},
    {email: "scelerisque@ligula.ca", password: "Y17mpMSsjfiEiMAE", password_confirmation: "Y17mpMSsjfiEiMAE"},
    {email: "ros@liguladonec.co.uk", password: "xJa0K51OpyGi5d3h", password_confirmation: "xJa0K51OpyGi5d3h"}
])

# Create user_channels to facilitate the M2M association of user_id -> channel_id
(0..users.length - 1).each do |i|
    users[i].channels << channels[i]
end

# Create a welcome message for each channel our database
channels.each do |channel|
    message = Message.create(content: "Welcome to the #{channel.name} channel!", user_id: channel.users.first.id, channel_id: channel.id)
end


