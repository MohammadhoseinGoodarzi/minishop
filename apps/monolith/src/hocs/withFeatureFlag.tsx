import type { ComponentType } from "react";

export function withFeatureFlag<P extends object>(
  Component: ComponentType<P>,
  isEnabled: boolean,
) {
  function WithFeatureFlag(props: P) {
    if (!isEnabled) return null;
    return <Component {...props} />;
  }

  WithFeatureFlag.displayName = `withFeatureFlag(${Component.displayName ?? Component.name})`;

  return WithFeatureFlag;
}
