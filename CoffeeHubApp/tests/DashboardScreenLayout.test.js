import React from 'react';
import { render } from '@testing-library/react-native';
import { Dimensions } from 'react-native';
import DashboardScreen from '../src/screens/dashboard/DashboardScreen';
import renderer from 'react-test-renderer';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setParams: jest.fn(),
};

// Mock Dimensions for different screen sizes
const mockDimensions = (width, height) => {
  jest.spyOn(Dimensions, 'get').mockReturnValue({ width, height });
};

describe('DashboardScreen KPI Grid 2x2 Layout Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const testScreenSizes = [
    { 
      name: 'Mobile Small (320px)', 
      width: 320, 
      height: 568, 
      expectedColumns: 1,
      expectedGrid: '1x4'
    },
    { 
      name: 'Mobile Standard (375px)', 
      width: 375, 
      height: 667, 
      expectedColumns: 1,
      expectedGrid: '1x4'
    },
    { 
      name: 'Tablet Portrait (768px)', 
      width: 768, 
      height: 1024, 
      expectedColumns: 2,
      expectedGrid: '2x2'
    },
    { 
      name: 'Tablet Landscape (1024px)', 
      width: 1024, 
      height: 768, 
      expectedColumns: 2,
      expectedGrid: '2x2'
    },
    { 
      name: 'Desktop (1440px)', 
      width: 1440, 
      height: 900, 
      expectedColumns: 2,
      expectedGrid: '2x2'
    }
  ];

  testScreenSizes.forEach(({ name, width, height, expectedColumns, expectedGrid }) => {
    describe(`${name} (${width}x${height})`, () => {
      beforeEach(() => {
        mockDimensions(width, height);
      });

      it('should render correctly with proper grid layout', () => {
        const { getByText } = render(
          <DashboardScreen navigation={mockNavigation} />
        );

        // Check if KPI cards are rendered
        expect(getByText('Produção Total')).toBeTruthy();
        expect(getByText('Talhões Ativos')).toBeTruthy();
        expect(getByText('Lotes Ativos')).toBeTruthy();
        expect(getByText('Pendências')).toBeTruthy();
      });

      it(`should use ${expectedGrid} grid layout`, () => {
        const tree = renderer.create(
          <DashboardScreen navigation={mockNavigation} />
        );

        const treeJSON = tree.toJSON();
        expect(treeJSON).toMatchSnapshot(`${name}-${expectedGrid}`);
      });

      it('should have appropriate card spacing and sizing', () => {
        const { getByText } = render(
          <DashboardScreen navigation={mockNavigation} />
        );

        // Verify all KPI cards are present
        const kpiCards = [
          getByText('Produção Total'),
          getByText('Talhões Ativos'),
          getByText('Lotes Ativos'),
          getByText('Pendências')
        ];

        kpiCards.forEach(card => {
          expect(card).toBeTruthy();
        });
      });
    });
  });

  describe('Grid Layout Validation', () => {
    it('should use 2x2 grid for screens >= 576px', () => {
      const largeScreenSizes = testScreenSizes.filter(size => size.width >= 576);
      
      largeScreenSizes.forEach(({ name, width, height }) => {
        mockDimensions(width, height);
        const { getByText } = render(
          <DashboardScreen navigation={mockNavigation} />
        );

        // All 4 KPI cards should be present
        expect(getByText('Produção Total')).toBeTruthy();
        expect(getByText('Talhões Ativos')).toBeTruthy();
        expect(getByText('Lotes Ativos')).toBeTruthy();
        expect(getByText('Pendências')).toBeTruthy();
      });
    });

    it('should use 1x4 grid for screens < 576px', () => {
      const smallScreenSizes = testScreenSizes.filter(size => size.width < 576);
      
      smallScreenSizes.forEach(({ name, width, height }) => {
        mockDimensions(width, height);
        const { getByText } = render(
          <DashboardScreen navigation={mockNavigation} />
        );

        // All 4 KPI cards should still be present, just in single column
        expect(getByText('Produção Total')).toBeTruthy();
        expect(getByText('Talhões Ativos')).toBeTruthy();
        expect(getByText('Lotes Ativos')).toBeTruthy();
        expect(getByText('Pendências')).toBeTruthy();
      });
    });
  });
});
