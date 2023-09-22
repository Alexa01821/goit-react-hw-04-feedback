import { useState } from 'react';
import { Container } from './AppStyled';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './StatisticsList/StatisticsList';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  const countPositiveFeedbackPercentage = () => {
    return `${Math.round((good / countTotalFeedback()) * 100)}%`;
  };
  const onLeaveFeedback = event => {
    const btnValue = event.target.textContent;
    switch (btnValue) {
      case 'good':
        setGood(good => good + 1);
        break;

      case 'bad':
        setBad(bad => bad + 1);
        break;

      case 'neutral':
        setNeutral(neutral => neutral + 1);
        break;

      default:
        console.log('error');
    }
  };

  return (
    <Container>
      <h1 className="title">Your feedback</h1>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {good || neutral || bad ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
};