import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import VueCountUp from '../countup.vue';
import type { VueCountUpProps } from '../countup.vue';

describe('VueCountUp', () => {
  let wrapper: VueWrapper<InstanceType<typeof VueCountUp>>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('Component Mounting', () => {
    it('should mount successfully with required props', () => {
      wrapper = mount(VueCountUp, {
        props: {
          endVal: 100,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.element.tagName).toBe('SPAN');
    });

    it('should use default delay value', () => {
      wrapper = mount(VueCountUp, {
        props: {
          endVal: 100,
        },
      });

      expect(wrapper.props('delay')).toBe(0);
    });

    it('should accept custom delay value', () => {
      wrapper = mount(VueCountUp, {
        props: {
          endVal: 100,
          delay: 1000,
        },
      });

      expect(wrapper.props('delay')).toBe(1000);
    });

    it('should accept CountUp.js options', () => {
      const options = {
        duration: 3,
        decimalPlaces: 2,
        prefix: '$',
      };

      wrapper = mount(VueCountUp, {
        props: {
          endVal: 100,
          options,
        },
      });

      expect(wrapper.props('options')).toEqual(options);
    });
  });

  describe('Props Validation', () => {
    it('should require endVal prop', () => {
      expect(VueCountUp.props?.endVal).toBeDefined();
    });

    it('should have correct prop types', () => {
      wrapper = mount(VueCountUp, {
        props: {
          endVal: 100,
        },
      });

      const props = wrapper.props() as VueCountUpProps;
      expect(typeof props.endVal).toBe('number');
    });
  });

  describe('Event Emission', () => {
    it('should emit ready event with negative delay', async () => {
      wrapper = mount(VueCountUp, {
        props: {
          endVal: 100,
          delay: -1,
        },
      });

      // Wait for next tick to ensure mounted hook is called
      await wrapper.vm.$nextTick();

      // Check if ready event was emitted
      expect(wrapper.emitted('ready')).toBeTruthy();
      expect(wrapper.emitted('ready')?.[0]).toBeDefined();
    });

    it('should emit ready event with instance and CountUp class', async () => {
      wrapper = mount(VueCountUp, {
        props: {
          endVal: 100,
          delay: -1,
        },
      });

      await wrapper.vm.$nextTick();

      const readyEvent = wrapper.emitted('ready')?.[0];
      expect(readyEvent).toBeDefined();
      expect(readyEvent?.[0]).toBeDefined(); // instance
      expect(readyEvent?.[1]).toBeDefined(); // CountUp class
    });
  });

  describe('Exposed Methods', () => {
    beforeEach(() => {
      wrapper = mount(VueCountUp, {
        props: {
          endVal: 100,
          delay: -1,
        },
      });
    });

    it('should expose printValue method', () => {
      expect(wrapper.vm.printValue).toBeDefined();
      expect(typeof wrapper.vm.printValue).toBe('function');
    });

    it('should expose start method', () => {
      expect(wrapper.vm.start).toBeDefined();
      expect(typeof wrapper.vm.start).toBe('function');
    });

    it('should expose pauseResume method', () => {
      expect(wrapper.vm.pauseResume).toBeDefined();
      expect(typeof wrapper.vm.pauseResume).toBe('function');
    });

    it('should expose reset method', () => {
      expect(wrapper.vm.reset).toBeDefined();
      expect(typeof wrapper.vm.reset).toBe('function');
    });

    it('should expose update method', () => {
      expect(wrapper.vm.update).toBeDefined();
      expect(typeof wrapper.vm.update).toBe('function');
    });

    it('should call methods without errors', async () => {
      await wrapper.vm.$nextTick();

      expect(() => wrapper.vm.printValue(50)).not.toThrow();
      expect(() => wrapper.vm.start()).not.toThrow();
      expect(() => wrapper.vm.pauseResume()).not.toThrow();
      expect(() => wrapper.vm.reset()).not.toThrow();
      expect(() => wrapper.vm.update(200)).not.toThrow();
    });
  });

  describe('Reactive Updates', () => {
    it('should update when endVal prop changes', async () => {
      wrapper = mount(VueCountUp, {
        props: {
          endVal: 100,
          delay: -1,
        },
      });

      await wrapper.vm.$nextTick();

      // Change endVal
      await wrapper.setProps({ endVal: 200 });

      expect(wrapper.props('endVal')).toBe(200);
    });
  });

  describe('Component Name', () => {
    it('should have correct component name', () => {
      expect(VueCountUp.name).toBe('VueCountUp');
    });
  });

  describe('Lifecycle', () => {
    it('should cleanup on unmount', async () => {
      wrapper = mount(VueCountUp, {
        props: {
          endVal: 100,
          delay: -1,
        },
      });

      await wrapper.vm.$nextTick();

      // Unmount the component
      wrapper.unmount();

      // Component should be unmounted
      expect(wrapper.exists()).toBe(false);
    });
  });
});
