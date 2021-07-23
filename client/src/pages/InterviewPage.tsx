import React, { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { useParams, Redirect } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ext-language_tools";

import { fetchInterview, setCode, setInterviewId } from "../store/interviewReducer";
import QuestionSidebar from "../components/QuestionSidebar";
import Video from "../components/Video";
import { RootState } from "../store";
import LoadingPage from "./LoadingPage";
import "../styles/InterviewPage.scss";

const InterviewPage: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { interviewId } = useParams<{ interviewId: string }>();
  const [socket, setSocket] = useState<Socket<any> | null>(null);
  const interviewState = useSelector((state: RootState) => state.interview, shallowEqual);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isInterviewer, setIsInterviewer] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setInterviewId(interviewId));
    dispatch(fetchInterview(interviewId));
  }, [dispatch, interviewId]);

  useEffect(() => {
    // TODO: Figure out how to switch in between?
    if (user?.id === interviewState.interview?.inviterId) setIsInterviewer(true);
  }, [interviewState.interview, user]);

  useEffect(() => {
    if (interviewState.interview) {
      const _socket = io("/", { query: { roomId: interviewId } });
      setSocket(_socket);
      _socket.on("update", (content) => dispatch(setCode(content)));
      _socket.on("error", (e) => console.log(e));
      return () => {
        setSocket(null);
        _socket.disconnect();
      };
    }
  }, [dispatch, interviewId, interviewState.interview]);

  const handleOnChange = (value: string) => {
    setCode(value);
    if (socket) socket.emit("update", { roomId: interviewId, message: value });
  };

  // TODO: Push global notification before redirect
  if (interviewState.redirect) return <Redirect to="/" />;
  if (interviewState.isLoading || !interviewState.interview) return <LoadingPage />;

  return (
    <div className="interviewPage">
      <Video interviewId={interviewId} />
      <QuestionSidebar question={interviewState.interview.questions[0]} isInterviewer={isInterviewer} />
      <div className="interviewPage__right">
        {
          // @ts-ignore
          <AceEditor
            mode="javascript"
            theme="monokai"
            width="100%"
            height="100%"
            name="ace-editor"
            value={interviewState.code}
            onChange={handleOnChange}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />
        }
      </div>
    </div>
  );
};

export default InterviewPage;
