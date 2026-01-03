'use client';

import { useState, useEffect } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
export type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useCollection hook.
 * @template T Type of the document data.
 */
export interface UseCollectionResult<T> {
  data: WithId<T>[] | null;
  isLoading: boolean;
  error: FirestoreError | Error | null;
}

/* Internal implementation of Query:
  https://github.com/firebase/firebase-js-sdk/blob/.../reference.ts#L143
*/
export interface InternalQuery extends Query<DocumentData> {
  _query: {
    path: {
      canonicalString(): string;
      toString(): string;
    };
  };
}

function getPathFromRefOrQuery(
  refOrQuery: CollectionReference<DocumentData> | Query<DocumentData>
): string {
  // CollectionReference has a "path" string and a "type" === "collection"
  const anyRef: any = refOrQuery as any;
  if (anyRef?.type === 'collection' && typeof anyRef?.path === 'string') {
    return anyRef.path;
  }

  // Query: reach into internal path (best-effort; used for debug context)
  try {
    return (refOrQuery as unknown as InternalQuery)._query.path.canonicalString();
  } catch {
    return 'unknown';
  }
}

/**
 * React hook to subscribe to a Firestore collection or query in real-time.
 * Handles nullable references/queries.
 *
 * IMPORTANT: you should memoize the input query/ref with useMemo in the caller
 *
 * @template T Optional type for document data. Defaults to any.
 * @param targetRefOrQuery - CollectionReference or Query; if null/undefined, does nothing.
 * @returns {UseCollectionResult<T>} Object with data, isLoading, error.
 */
export function useCollection<T = any>(
  targetRefOrQuery:
    | CollectionReference<DocumentData>
    | Query<DocumentData>
    | null
    | undefined
): UseCollectionResult<T> {
  type ResultItemType = WithId<T>;
  type StateDataType = ResultItemType[] | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    if (!targetRefOrQuery) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      targetRefOrQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const results: ResultItemType[] = snapshot.docs.map((d) => ({
          ...(d.data() as T),
          id: d.id,
        }));

        setData(results);
        setError(null);
        setIsLoading(false);
      },
      (err: FirestoreError) => {
        const path = getPathFromRefOrQuery(targetRefOrQuery);

        // ✅ Only wrap as permission error when it's REALLY permission-denied
        if (err.code === 'permission-denied') {
          const contextualError = new FirestorePermissionError({
            operation: 'list',
            path,
          });

          setError(contextualError);
          errorEmitter.emit('permission-error', contextualError);
        } else {
          // ✅ Keep the real Firestore error (index missing, invalid query, etc.)
          setError(err);
        }

        setData(null);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [targetRefOrQuery]);

  return { data, isLoading, error };
}
