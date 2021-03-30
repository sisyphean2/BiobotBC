import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryGroup } from 'victory';
import _ from 'underscore';
import {
  addData,
  selectIsLoaded,
  selectSelectedUSState,
  selectUSCovidData
} from './covidGraphSlice';

export function CovidGraph() {

  // TODO (cato): Find a better place for this fetch logic. Also, research best practices on fetching in Redux.
  const dispatch = useDispatch();
  const dataUrl = 'https://corona.lmao.ninja/v2/jhucsse/counties';
  const fetchParams = {
    method: 'GET'
  };

  useEffect(() => {
    fetch(dataUrl, fetchParams)
      .then(response => response.json())
      .then(
        responseData => dispatch(addData({isLoaded: 'true', responseData: responseData})),
        error => dispatch(addData({isLoaded: 'error', responseData: {}}))
      )
  }, []);

  const selectedUSState = useSelector(selectSelectedUSState);
  const isLoaded = useSelector(selectIsLoaded);
  const uSCovidData = useSelector(selectUSCovidData);

  const getContent = () => {

    // TODO (cato) Disable the selection tool while we wait for the data to come in.
    if (isLoaded === 'false') {
      return (
        <div>
          Please wait while we get the latest Covid Data.
        </div>
      );
    }

    // TODO (cato) Create some sort of type safety for ensuring that the province and state comparison works for all capitalizations and formats.
    const dataToDisplay = _.filter(uSCovidData, countyData => countyData.province === selectedUSState);
    const graphDataElements = _.map(dataToDisplay, countyData => {
      return (
        <VictoryBar
          barWidth={4}
          categories={{x: ['Cases', 'Recovered', 'Deaths']}}
          data={[
            { x: 'Cases', y: countyData.stats.confirmed }, 
            { x: 'Recovered', y: countyData.stats.recovered }, 
            { x: 'Deaths', y: countyData.stats.deaths }
          ]}
        />
      );
    });

    // TODO (cato) Make this look better. So many potential improvements including dynamic sizing, county name labeling, 
    // ability to limit the number of counties displayed, etc.
    return (
      <VictoryChart height={600} width={1500}>
        <VictoryGroup offset={6}
          colorScale={"qualitative"}
        >
        {graphDataElements}
        </VictoryGroup>
      </VictoryChart>
    )
  };

  return (
    <div>
      {getContent()}
    </div>
  );
}
