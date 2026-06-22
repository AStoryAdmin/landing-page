import {SecondPageContainer, Title, Highlight, Description, StatsRow, CountBox, CounterAnimation, CountLabel, MemTitle, MemHeading, MemDescription} from './story.styles';
// import React, { useState, useEffect } from 'react';
import Counter from "./counter"

const Story = () => {
    return (
        <SecondPageContainer>
            <Title>Every life holds a story <Highlight>worth keeping. </Highlight> Most are never told.</Title>

            <Description>The people we love carry whole worlds inside them &mdash; the smell of a childhood kitchen, the day everything changed, how the family found its way here. These stories live in one place only. And we almost always mean to ask&hellip; later </Description>
            
            <StatsRow>
                <CountBox>
                    <CounterAnimation><Counter target={40000} duration={10}/>+</CounterAnimation>
                    <CountLabel>stories lost every single day</CountLabel>
                </CountBox>
                <CountBox>
                    <CounterAnimation><Counter target={67} duration={4000}/>%</CounterAnimation>
                    <CountLabel>adults have never recorded a parent</CountLabel>
                </CountBox>
                <CountBox>
                    <CounterAnimation><Counter target={1000000} duration={1}/>+</CounterAnimation>
                    <CountLabel>questions left forever unasked</CountLabel>
                </CountBox>
            </StatsRow>
            <MemTitle>Watch a memory come back</MemTitle>
            <MemHeading>"I'm not sure where <br></br>to start &hellip;"</MemHeading>
            <MemDescription>Most people freeze at first. Watch how A Story gently finds the thread &mdash; and turns "I don't know" into the story of how Grandma met Grandpa. Tap play, sound on.</MemDescription>       
        </SecondPageContainer>
    )

}

export default Story;