import { Box } from "@mui/material";
import { forwardRef } from "react";

interface IProps {
  name: string;
  id: number;
}

const MessageBubble = forwardRef((props: IProps, ref) => {
  const { name, id } = props;
  return (
    <>
      <Box
        ref={ref}
        my={2}
        width="100%"
        display="flex"
        // add styles considering whether the id is even or odd

        justifyContent={id % 2 ? "flex-start" : "flex-end"}
        alignItems="center"
        height={"30px"}
      >
        <Box
          // add styles considering whether the id is even or odd
          bgcolor={id % 2 ? "#e4e6eb" : "#0084ff"}
          color={id % 2 ? "#050505" : "#ffffff"}
          borderRadius={2}
          p={2}
        >
          {`${name} ${id}`}
        </Box>
        {/* top */}
      </Box>
    </>
  );
});

export default MessageBubble;
