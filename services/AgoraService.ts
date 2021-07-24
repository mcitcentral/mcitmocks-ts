import { Interview } from "@prisma/client";
import { RtcTokenBuilder, RtcRole } from "agora-access-token";

export default class AgoraService {
  appId: string;
  appCertificate: string;

  constructor() {
    this.appId = process.env.AGORA_APP_ID!;
    this.appCertificate = process.env.AGORA_APP_CERTIFICATE!;
  }

  generateAgoraToken(interview: Interview) {
    const channelName = interview.id;
    const privilegeExpireTime = Math.floor(Date.now() / 1000) + 3600;
    return RtcTokenBuilder.buildTokenWithUid(
      this.appId,
      this.appCertificate,
      channelName,
      0,
      RtcRole.SUBSCRIBER,
      privilegeExpireTime
    );
  }
}
