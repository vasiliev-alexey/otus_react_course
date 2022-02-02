import { AnyAction } from '@reduxjs/toolkit';
import { CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects';

export type Watcher = Generator<ForkEffect>;

export type Caller<T extends (...args: unknown[]) => unknown> = CallEffect<
  Awaited<ReturnType<T>>
>;

export type SagaActionWorker<
  T extends (...args: unknown[]) => unknown,
  U extends (...args: unknown[]) => AnyAction
> = Generator<CallEffect<Awaited<ReturnType<T>>> | PutEffect<ReturnType<U>>>;
