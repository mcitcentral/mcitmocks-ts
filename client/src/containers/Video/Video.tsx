import React, { useEffect } from "react";
import AgoraRTC, { ILocalVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import Draggable from "react-draggable";
import { FaVideo } from "react-icons/fa";

import "./Video.scss";
import { useState } from "react";

interface VideoProps {
  interviewId: string;
  agoraId: string;
}

const agoraClient = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

const Video: React.FC<VideoProps> = ({ agoraId, interviewId }) => {
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | null>(null);
  const [remoteVideoTrack, setRemoteVideoTrack] = useState<IRemoteVideoTrack | null>(null);

  const appId = process.env.REACT_APP_AGORA_APP_ID!;

  useEffect(() => {
    agoraClient.join(appId, interviewId, agoraId);
    agoraClient.on("user-published", async (user, mediaType) => {
      await agoraClient.subscribe(user, mediaType);
      if (mediaType === "video" && user.videoTrack) {
        setRemoteVideoTrack(user.videoTrack);
        user.videoTrack.play("videoRemote");
      }
      if (mediaType === "audio" && user.audioTrack) user.audioTrack.play();
    });
  });

  const handleStart = async () => {
    const [_localAudioTrack, _localVideoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
    agoraClient.publish([_localAudioTrack, _localVideoTrack]);
    setLocalVideoTrack(_localVideoTrack);
    _localVideoTrack?.play("videoLocal");
  };

  return (
    <>
      {
        // @ts-ignore
        <Draggable>
          <div id="videoLocal">
            {!localVideoTrack && (
              <button onClick={handleStart}>
                <FaVideo color="white" size={24} />
              </button>
            )}
          </div>
        </Draggable>
      }
      {
        // @ts-ignore
        <Draggable>
          <div id="videoRemote">{!remoteVideoTrack && <p>Waiting for interview partner...</p>}</div>
        </Draggable>
      }
    </>
  );
};

export default Video;
