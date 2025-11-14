<template>
  <span ref="countupRef" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { CountUp, type CountUpOptions } from 'countup.js';

export interface VueCountUpProps {
  /**
   * Delay in milliseconds before starting the animation
   * Set to -1 to prevent auto-start (manual start required)
   * @default 0
   */
  delay?: number;
  /**
   * The target value to count to
   */
  endVal: number;
  /**
   * CountUp.js options
   */
  options?: CountUpOptions;
}

export interface VueCountUpEmits {
  (e: 'ready', instance: CountUp, CountUpClass: typeof CountUp): void;
  (e: 'error', error: string): void;
}

const props = withDefaults(defineProps<VueCountUpProps>(), {
  delay: 0,
});

const emit = defineEmits<VueCountUpEmits>();

// Template ref
const countupRef = ref<HTMLElement | null>(null);

// CountUp instance
const instance = ref<CountUp | null>(null);

// Timer ID for delayed start
const timerId = ref<ReturnType<typeof setTimeout> | null>(null);

// Constants for special delay values
const MANUAL_START_DELAY = -1;

/**
 * Helper function to safely execute CountUp instance methods
 * Encapsulates instance checking and error handling (DRY, Tell Don't Ask, Fail Fast)
 */
const executeInstanceMethod = <T extends unknown[]>(methodName: keyof CountUp, ...args: T): void => {
  if (!instance.value) {
    const errorMsg = `CountUp instance not initialized. Cannot call ${String(methodName)}`;
    emit('error', errorMsg);
    throw new Error(errorMsg);
  }

  const method = instance.value[methodName];
  if (typeof method !== 'function') {
    const errorMsg = `Method ${String(methodName)} not found on CountUp instance`;
    emit('error', errorMsg);
    throw new Error(errorMsg);
  }

  try {
    (method as (...args: T) => void).apply(instance.value, args);
  } catch (error) {
    const errorMsg = `Error executing ${String(methodName)}: ${error instanceof Error ? error.message : String(error)}`;
    emit('error', errorMsg);
    throw error;
  }
};

/**
 * Check if auto-start should be prevented
 */
const shouldPreventAutoStart = (): boolean => {
  return props.delay === MANUAL_START_DELAY;
};

/**
 * Create and initialize the CountUp instance
 */
const create = (): void => {
  if (instance.value || !countupRef.value) {
    return;
  }

  const countUpInstance = new CountUp(countupRef.value, props.endVal, props.options);

  if (countUpInstance.error) {
    const errorMsg = `CountUp initialization error: ${countUpInstance.error}`;
    emit('error', errorMsg);
    throw new Error(errorMsg);
  }

  instance.value = countUpInstance;

  if (shouldPreventAutoStart()) {
    emit('ready', countUpInstance, CountUp);
    return;
  }

  timerId.value = setTimeout(() => {
    countUpInstance.start(() => emit('ready', countUpInstance, CountUp));
  }, props.delay);
};

/**
 * Destroy the CountUp instance and cleanup resources
 */
const destroy = (): void => {
  if (timerId.value !== null) {
    clearTimeout(timerId.value);
    timerId.value = null;
  }
  if (instance.value) {
    // Reset the instance to stop any running animations
    instance.value.reset();
    instance.value = null;
  }
};

/**
 * Print a value on the CountUp instance
 * @param value - The numeric value to display
 */
const printValue = (value: number): void => {
  if (typeof value !== 'number' || !isFinite(value)) {
    throw new Error('printValue requires a finite number');
  }
  executeInstanceMethod('printValue', value);
};

/**
 * Start the count animation
 * @param callback - Optional callback to execute when animation completes
 */
const start = (callback?: () => void): void => {
  executeInstanceMethod('start', callback);
};

/**
 * Pause or resume the count animation
 */
const pauseResume = (): void => {
  executeInstanceMethod('pauseResume');
};

/**
 * Reset the count animation
 */
const reset = (): void => {
  executeInstanceMethod('reset');
};

/**
 * Update the end value and animate to it
 * @param newEndVal - The new target value
 */
const update = (newEndVal: number): void => {
  if (typeof newEndVal !== 'number' || !isFinite(newEndVal)) {
    throw new Error('update requires a finite number');
  }
  executeInstanceMethod('update', newEndVal);
};

// Watch for endVal changes and update the animation
watch(
  () => props.endVal,
  newValue => {
    if (instance.value?.update) {
      try {
        instance.value.update(newValue);
      } catch (error) {
        const errorMsg = `Error updating endVal: ${error instanceof Error ? error.message : String(error)}`;
        emit('error', errorMsg);
      }
    }
  }
);

// Lifecycle hooks
onMounted(() => {
  create();
});

onBeforeUnmount(() => {
  destroy();
});

// Expose public methods
defineExpose({
  printValue,
  start,
  pauseResume,
  reset,
  update,
});
</script>

<script lang="ts">
export default {
  name: 'VueCountUp',
};
</script>
