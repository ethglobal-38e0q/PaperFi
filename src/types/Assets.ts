export interface HermesAsset {
  id: string;
  attributes: {
    asset_type: string;
    base: string;
    description: string;
    display_symbol: string;
    generic_symbol?: string;
    quote_currency: string;
    schedule: string;
    symbol: string;
    country?: string;
    publish_interval?: string;
    contract_id?: string;
  };
}
