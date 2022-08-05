const { SlashCommandBuilder } = require("@discordjs/builders");
var https = require('https');
var fs = require('fs');
const wackywebm = require('../../oldwackywebm');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("wacky")
        .setDescription("make a video wacky")
        .addAttachmentOption(option =>
            option.setName('video')
                .setDescription('video to wacky')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('enter the mode of wacky')
                .addChoices(
                    { name: 'audiobounce', value: 'audiobounce' },
                    { name: 'audioshutter', value: 'audioshutter' },
                    { name: 'bounce', value: 'bounce' },
                    { name: 'shutter', value: 'shutter' },
                    { name: 'shrink', value: 'shrink' },
                )
                .setRequired(true)),
    async execute(interaction) {
        interaction.deferReply();
        //get the video
        const video = interaction.options.getAttachment('video');
        //get the mode
        const mode = interaction.options.getString('mode');
        if (video.contentType != "video/mp4") { return interaction.reply("please upload a mp4"); }
        //download the video
        await download(video.url,interaction,mode);
        //make the wacky
        //console.log(video);
        //console.log(mode);
    },
};

async function download(url,interaction,mode){
    const file = fs.createWriteStream("video/video.mp4");
    const request = await https.get(url, function (response) {
        response.pipe(file);

        // after download completed close filestream
        file.on("finish", () => {
            file.close();
            console.log("Download Completed");
            wacky(interaction,mode);
            return;     
        });
    });
    console.log(request);
}

async function wacky(interaction,mode){
    const wacky = await wackywebm.main("video/video.mp4",mode);
    //check if video/video.webm exists
    if (fs.existsSync("video/video.webm")) {
        //send as reply
        await interaction.editReply({
            files: [{
                attachment: "video/video.webm",
                name: "wacky.webm"
            }]
        });
        //delete the video
        fs.unlinkSync("video/video.webm");
        return;
    }

    //console.log(wacky);

}