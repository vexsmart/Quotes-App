import { useParams, useRouteMatch, Route, Link } from "react-router-dom";
import { Fragment, useEffect } from "react";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = (props) => {
  const match = useRouteMatch();
  const params = useParams();
  const {sendRequest, status, error, data: quoteData} = useHttp(getSingleQuote, true)
  const {quoteId} = params
  
  useEffect(()=>{
    sendRequest(quoteId)
  },[sendRequest, quoteId])

  if(status === 'pending'){
    return <div className="centered">
      <LoadingSpinner />
    </div>
  }

  if(error){
    return <h1 className="centered">{error}</h1>
  }

  if(!quoteData.text){
    return <h1 className="centered">Quote not Found!</h1>
  }

  return (
    <Fragment>
      <HighlightedQuote author={quoteData.author} text={quoteData.text}  />
      <Route path={`/quotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`} className="btn">
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
