import React, { useContext, useState } from "react";
import produce from "immer";
import { TravelInfoStateContext } from "..";
import styled from "styled-components";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import { useEffect } from "react";

const DaysWrapper = styled.div`
  position: fixed;
  height: 100vh;
`;

export default function Days() {
  const { travelInfo, setTravelInfo, days, setDays } = useContext(
    TravelInfoStateContext
  );
  const { travelList, startDate, dayCount, startTime } = travelInfo;

  useEffect(() => {
    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <DaysWrapper>
      <ul>
        {days.map((day) => {
          return (
            <li key={day}>
              <Link
                activeClass="active"
                className="days"
                to={day}
                spy={true}
                smooth={true}
                duration={500}
                activeStyle={{ color: "red" }}
              >
                {day}
              </Link>
            </li>
          );
        })}
      </ul>
    </DaysWrapper>
  );
}
