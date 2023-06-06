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
  width: 100px;
`;

const DaysContainer = styled.div`
  position: fixed;
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

  const scrollToWithContainer = (day) => {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register("end", () => {
        resolve(day);
        Events.scrollEvent.remove("end");
      });

      scroller.scrollTo("scroll-container", {
        duration: 0,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    });

    goToContainer.then(() =>
      scroller.scrollTo(day, {
        duration: 500,
        delay: 0,
        
        smooth: "easeInOutQuart",
        containerId: "scroll-container",
      })
    );
  };

  return (
    <DaysWrapper>
      <DaysContainer>
        <ul>
          {days.map((day) => {
            return (
              <li key={day}>
                <Link to={day} 
                containerId="scroll-container"
                activeStyle={{color:'red'}} spy={true} smooth={true} duration={500}>
                  {day}
                </Link>
                {/* <a
                  className="test1"
                  to="test1"
                  onClick={() => {
                    scrollToWithContainer(day);
                  }}
                >
                  {day}
                </a> */}
              </li>
            );
          })}
        </ul>
      </DaysContainer>
    </DaysWrapper>
  );
}
