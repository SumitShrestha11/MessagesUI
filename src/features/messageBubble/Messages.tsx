import { useIntersection } from "@mantine/hooks";
import { Box } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MessageBubble from "../../components/message/MessageBubble";
import { getMessages, reset } from "./messagesSlice";

const Messages = () => {
  const { messages, status, pagination } = useAppSelector(
    (state) => state.messages
  );

  const dispatch = useAppDispatch();

  const [fetchURL, setFetchURL] = useState(
    "https://gorest.co.in/public/v1/users"
  );

  useEffect(() => {
    dispatch(getMessages(fetchURL));
  }, [fetchURL]);

  const topElement = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: topElement.current,
    threshold: 1,
  });

  const lastElement = useRef<HTMLElement>(null);

  useEffect(() => {
    if (entry?.isIntersecting && pagination?.links?.next) {
      setFetchURL(pagination?.links?.next);
    }
  }, [entry]);

  const scrollToBottom = () => {
    lastElement.current?.scrollIntoView({ behavior: "instant" });
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <>
      <Box display="flex" flexDirection="column-reverse" gap={2}>
        {messages.length > 0 ? (
          <>
            {messages.map((message, index) => {
              if (index === messages.length - 1) {
                return (
                  <MessageBubble
                    key={index}
                    ref={ref}
                    name={message.name}
                    id={message.id}
                  />
                );
              } else if (index === messages.length - pagination.limit) {
                return (
                  <MessageBubble
                    key={index}
                    ref={lastElement}
                    name={message.name}
                    id={message.id}
                  />
                );
              } else {
                return (
                  <MessageBubble
                    key={index}
                    name={message.name}
                    id={message.id}
                  />
                );
              }
            })}
          </>
        ) : (
          <>{status === "loading" ? "Loading..." : "No Messages"}</>
        )}
        {status === "loading" && <Box mt={5}>Loading...</Box>}
      </Box>
    </>
  );
};

export default Messages;
