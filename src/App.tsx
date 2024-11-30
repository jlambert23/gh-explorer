import { Link as ChakraLink, Container } from "@chakra-ui/react";
import { Link, Route, Switch } from "wouter";
import { Login } from "./auth/Login";
import { MilestoneDetails } from "./milestones/MilestoneDetails";
import { Milestones } from "./milestones/Milestones";
import { Repositories } from "./repos/Repositories";

function App() {
  return (
    <Container paddingBlock="1rem" className="dark">
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/repos" component={Repositories} />
        <Route path="/repos/:id/milestones">
          {(params) => (
            <>
              <ChakraLink asChild colorPalette="red">
                <Link to="/repos">&larr; Back</Link>
              </ChakraLink>
              <Milestones repoId={Number(params.id)} />
            </>
          )}
        </Route>
        <Route path="/repos/:repoId/milestones/:id">
          {(params) => (
            <>
              <ChakraLink asChild colorPalette="red">
                <Link to={`/repos/${params.repoId}/milestones`}>
                  &larr; Back
                </Link>
              </ChakraLink>
              <MilestoneDetails
                repoId={Number(params.repoId)}
                milestoneId={params.id}
              />
            </>
          )}
        </Route>
        <Route>404: No such page!</Route>
      </Switch>
    </Container>
  );
}

export default App;
