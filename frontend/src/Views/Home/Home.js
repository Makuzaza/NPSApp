import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import Form from '../../Components/Form/Form';
import HomeInfo from "../../Components/HomeInfo/HomeInfo";
import Voted from "../../Components/Voted/Voted";
import { getCookie } from '../../utils';

const Home = ({ setOpen,setSubmitterId }) => {
  const [voted, setVoted] = useState(false);

  
  useEffect(() => {
    setVoted(getCookie("id") ? true : false);
  }, [voted]);
  const content =
    getCookie("id") && voted ? (
      <Voted />
    ) : (
      <Form
        setSubmitterId={setSubmitterId}
        setOpen={setOpen}
        setVoted={setVoted}
      />
    );
  return (
    <Container data-testid="home-page">
      <HomeInfo />
      {content}
    </Container>
  );
};

export default Home