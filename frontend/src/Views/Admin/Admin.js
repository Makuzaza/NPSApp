import React, { useState } from "react";
import { Box, Container, CircularProgress } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import Charts from "../../Components/Charts/Charts";
import NPSScore from "../../Components/NPSScore/NPSScore";
import FilterByDate from "../../Components/FilterByDate/FilterByDate";
import Scores from "../../Components/Scores/Scores";
import FeedbackMessages from "../../Components/FeedbackMessages/FeedbackMessages";
import { GET_SUBMISSIONS } from "../../utils/graphql";
import AdvancedCharts from "../../Components/AdvancedCharts/AdvancedCharts";
import { Switch, Route } from "react-router-dom";

export default function Admin() {
  const [filterDate, setFilterDate] = useState(null);
  const { loading, data } = useQuery(GET_SUBMISSIONS);
  if (loading)
    return (
      <Box
        data-testid="loading-box"
        sx={{ display: "flex", justifyContent: "center", padding: "100px 0" }}
      >
        <CircularProgress />
      </Box>
    );
  const submissions = !filterDate
    ? data.getAllSubmissions
    : data.getAllSubmissions.filter(
        (submission) => submission.created_at > filterDate.getTime()
      );

  return (
    <Container>
      <Switch>
        <Route exact path="/admin/">
          <NPSScore scores={data.getAllSubmissions} />
        </Route>
        <Route exact path="/admin/responses">
          <FilterByDate setFilterDate={setFilterDate} filterDate={filterDate} />
          <Scores submissions={submissions} />
        </Route>
        <Route exact path="/admin/charts">
          <Charts data={submissions} />
          <AdvancedCharts data={submissions} />
        </Route>
        <Route exact path="/admin/feedback">
          <FeedbackMessages submissions={submissions} />
        </Route>
      </Switch>
    </Container>
  );
}
