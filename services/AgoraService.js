"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agora_access_token_1 = require("agora-access-token");
class AgoraService {
    constructor() {
        this.appId = process.env.AGORA_APP_ID;
        this.appCertificate = process.env.AGORA_APP_CERTIFICATE;
    }
    generateAgoraToken(interview) {
        const channelName = interview.id;
        const privilegeExpireTime = Math.floor(Date.now() / 1000) + 3600;
        return agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(this.appId, this.appCertificate, channelName, 0, agora_access_token_1.RtcRole.SUBSCRIBER, privilegeExpireTime);
    }
}
exports.default = AgoraService;
