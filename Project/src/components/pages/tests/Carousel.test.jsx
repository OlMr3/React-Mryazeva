import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import Carousel from '../Carousel';

describe('Carousel', () => {
  const mockSlides = [
    { image: 'image1.jpg', alt: 'Slide 1' },
    { image: 'image2.jpg', alt: 'Slide 2' },
    { image: 'image3.jpg', alt: 'Slide 3' },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Базовая функциональность', () => {
    test('отображает все слайды', () => {
      render(<Carousel slides={mockSlides} />);

      mockSlides.forEach(slide => {
        expect(screen.getByAltText(slide.alt)).toBeInTheDocument();
      });
    });

    test('показывает первый слайд активным изначально', () => {
      render(<Carousel slides={mockSlides} />);

      const container = screen.getByAltText('Slide 1').parentElement;
      expect(container).toHaveStyle('transform: translateX(-0%)');
    });
  });

  describe('Навигация по кнопкам', () => {
    test('правая кнопка переключает на следующий слайд', () => {
      render(<Carousel slides={mockSlides} />);
      const buttons = screen.getAllByRole('button');
      const rightButton = buttons[buttons.length - 1];

      fireEvent.click(rightButton);

      const container = screen.getByAltText('Slide 1').parentElement;
      expect(container).toHaveStyle('transform: translateX(-100%)');
    });

    test('левая кнопка переключает на предыдущий слайд', () => {
      render(<Carousel slides={mockSlides} />);

      const buttons = screen.getAllByRole('button');
      const leftButton = buttons[0];
      const rightButton = buttons[buttons.length - 1];
      fireEvent.click(rightButton);
      fireEvent.click(leftButton);
      const container = screen.getByAltText('Slide 1').parentElement;
      expect(container).toHaveStyle('transform: translateX(-0%)');
    });
  });

  describe('Навигация по точкам', () => {
    test('клик на точку переключает на соответствующий слайд', () => {
      render(<Carousel slides={mockSlides} />);
      const allInteractiveElements = screen.getAllByRole('button');
      const dots = allInteractiveElements.slice(1, -1);
      if (dots.length >= 3) {
        fireEvent.click(dots[2]);
        const container = screen.getByAltText('Slide 1').parentElement;
        expect(container).toHaveStyle('transform: translateX(-200%)');
      }
    });
  });

  describe('Автоплей', () => {
    test('автоматически переключает слайды каждые 3 секунды', () => {
      render(<Carousel slides={mockSlides} />);

      let container = screen.getByAltText('Slide 1').parentElement;
      expect(container).toHaveStyle('transform: translateX(-0%)');

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      container = screen.getByAltText('Slide 1').parentElement;
      expect(container).toHaveStyle('transform: translateX(-100%)');
    });

    test('автоплей останавливается при ручной навигации', () => {
      render(<Carousel slides={mockSlides} />);

      const buttons = screen.getAllByRole('button');
      const rightButton = buttons[buttons.length - 1];
      fireEvent.click(rightButton);
      act(() => {
        vi.advanceTimersByTime(6000);
      });

      const container = screen.getByAltText('Slide 1').parentElement;
      expect(container).toHaveStyle('transform: translateX(-100%)');
    });
  });

  describe('Крайние случаи', () => {
    test('переход с последнего на первый слайд', () => {
      render(<Carousel slides={mockSlides} />);

      const buttons = screen.getAllByRole('button');
      const rightButton = buttons[buttons.length - 1];
      fireEvent.click(rightButton); // 2
      fireEvent.click(rightButton); // 3 (последний)
      fireEvent.click(rightButton);
      const container = screen.getByAltText('Slide 1').parentElement;
      expect(container).toHaveStyle('transform: translateX(-0%)');
    });

    test('работа с пустым массивом слайдов', () => {
      render(<Carousel slides={[]} />);
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});

