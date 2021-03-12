import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe ('Component TripSummary', () => {
  it ('should render link to correct address', () => {
    const expectedLink = '/trip/abc';
    const expectedId = 'abc';
    const component = shallow (<TripSummary id= {expectedId} tags= {['tag1', 'tag2', 'tag3']} /> );

    expect (component.find('.link').prop('to')).toEqual(expectedLink);
  });

  it ('has correct image src and alt', () => {
    const expectedImg = 'image.jpg';
    const expectedName = 'tripName';
    const component = shallow (<TripSummary image={expectedImg} name={expectedName} tags= {[]} /> );

    expect (component.find('img').prop('src')).toEqual(expectedImg);
    expect (component.find('img').prop('alt')).toEqual(expectedName);
  });

  it('shoud render correct props name, cost and days', () => {
    const expectedName = 'text';
    const expectedCost = '$ 20000';
    const expectedDays = 1;
    const component = shallow(<TripSummary name = {expectedName} cost = {expectedCost} days = {expectedDays} tags= {[]} /> );

    expect (component.find('.title').text()).toEqual(expectedName);
    expect (component.find('.details span').first().text()).toEqual(`${expectedDays} days`);
    expect (component.find('.details span').last().text()).toEqual(`from ${expectedCost}`);
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary/>)).toThrow();
  });

  it('should render tags in proper order', () => {
    const expectedTags = ['tag1', 'tag2', 'tag3'];
    const component = shallow(<TripSummary tags= {expectedTags} />
    );

    expect(component.find('.tags span').at(0).text()).toEqual(expectedTags[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(expectedTags[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(expectedTags[2]);
  });

  it('should not render tags if the tags prop is not provided', () => {
    const expectedTags = [];
    const component = shallow(<TripSummary tags={expectedTags} /> );

    expect(component.find('.tags').html()).toBe('<div class="tags"></div>');
  });
});
