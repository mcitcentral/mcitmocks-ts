import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import Draggable from "react-draggable";
import "./Video.scss";

interface VideoProps {
  interviewId: string;
}

const Video: React.FC<VideoProps> = ({ interviewId }) => {
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const [socket, setSocket] = useState<Socket<any> | null>(null);

  const servers = {
    iceServers: [{ urls: ["stun:stun1.l.google.com:19302"] }],
    iceCandidatePoolSize: 10,
  };

  let localStream: MediaStream = new MediaStream();
  let remoteStream: MediaStream = new MediaStream();
  const localConnection = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));
  const remoteConnection = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));

  remoteConnection.current.addEventListener("track", (e: RTCTrackEvent) => {
    remoteStream.addTrack(e.track);
    if (remoteVideo.current) remoteVideo.current.srcObject = remoteStream;
  });

  useEffect(() => {
    const _socket = io("/", { query: { roomId: interviewId } });
    setSocket(_socket);
    _socket.on("requestVideo", async () => {
      const offer = await localConnection.current.createOffer();
      await localConnection.current.setLocalDescription(offer);
      _socket.emit("offerVideo", { roomId: interviewId, message: offer });
    });
    _socket.on("offerVideo", async (message) => {
      if (!remoteConnection.current.remoteDescription) {
        await remoteConnection.current.setRemoteDescription(message);
        const answer = await remoteConnection.current.createAnswer();
        await remoteConnection.current.setLocalDescription(answer);
        _socket.emit("answerVideo", { roomId: interviewId, message: answer });
      }
    });
    _socket.on("answerVideo", async (message) => {
      await localConnection.current.setRemoteDescription(message);
    });
    _socket.on("icecandidate", async (message) => {
      console.log(message);
      await remoteConnection.current.addIceCandidate(message);
    });
    return () => {
      setSocket(null);
      _socket.disconnect();
    };
  }, [interviewId]);

  useEffect(() => {
    localConnection.current.addEventListener("icecandidate", (event) => {
      if (event.candidate && socket) socket.emit("icecandidate", { roomId: interviewId, message: event.candidate });
    });
  }, [socket, interviewId]);

  const handleClick = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.getTracks().forEach((track: MediaStreamTrack) => localConnection.current.addTrack(track));
    if (localVideo.current) localVideo.current.srcObject = localStream;
    if (socket) {
      const offer = await localConnection.current.createOffer();
      await localConnection.current.setLocalDescription(offer);
      socket.emit("offerVideo", { roomId: interviewId, message: offer });
    }
  };

  return (
    <>
      <Draggable>
        <div className="videoLocal">
          <video autoPlay playsInline controls={false} ref={localVideo} />
          <button onClick={handleClick}>Start</button>
        </div>
      </Draggable>
      <Draggable>
        <div className="videoRemote">
          <video autoPlay playsInline controls={false} ref={remoteVideo} />
        </div>
      </Draggable>
    </>
  );
};

export default Video;
