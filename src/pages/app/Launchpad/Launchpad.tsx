import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Rocket,
  Activity,
  Filter,
  Clock,
  Globe,
  TrendingUp,
} from "lucide-react";
import { HermesAsset } from "@/types/Assets";
import axios from "axios";

const AssetCard = ({
  asset,
  onClick,
}: {
  asset: HermesAsset;
  onClick: () => void;
}) => {
  return (
    <Card
      className="glass-hover group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:glow-primary"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center font-bold text-white text-lg">
              {asset.attributes.base.slice(0, 2)}
            </div>
            <div>
              <CardTitle className="text-xl">{asset.attributes.base}</CardTitle>
              <CardDescription className="text-sm">
                {asset.attributes.display_symbol}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {asset.attributes.asset_type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {asset.attributes.description}
        </p>

        {/* Asset Details */}
        <div className="space-y-2">
          {asset.attributes.country && (
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Country:</span>
              <span className="font-medium">{asset.attributes.country}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Quote: {asset.attributes.quote_currency}</span>
          </div>
        </div>

        {/* Trade Button */}
        <Button
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          size="sm"
        >
          Trade {asset.attributes.base}
        </Button>
      </CardContent>
    </Card>
  );
};

const Launchpad = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("all");
  const [selectedSchedule, setSelectedSchedule] = useState("all");
  const [sortBy, setSortBy] = useState("symbol");
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<HermesAsset[]>([]);

  const itemsPerPage = 12;

  useEffect(() => {
    const loadAssets = async () => {
      setIsLoading(true);
      const assets = await axios.get(
        "https://hermes.pyth.network/v2/price_feeds"
      );
      setAssets(assets.data);
      setIsLoading(false);
    };

    loadAssets();
  }, []);

  // Get unique values for filters
  const assetTypes = useMemo(() => {
    const types = new Set(assets.map(asset => asset.attributes.asset_type));
    return Array.from(types).sort();
  }, []);

  const schedules = useMemo(() => {
    const schedules = new Set(assets.map(asset => asset.attributes.schedule));
    return Array.from(schedules).sort();
  }, []);

  // Filter and sort assetsfilteredAssets
  const filteredAssets = useMemo(() => {
    const filteredAssets = assets.filter(
      asset =>
        (asset.attributes.base
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          asset.attributes.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        asset.attributes.asset_type === "Crypto"
    );
    return filteredAssets;
  }, [searchTerm, assets]);

  // Pagination
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAssets = filteredAssets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAssetClick = (asset: HermesAsset) => {
    window.open(
      `/app/trade?pair=${asset.attributes.symbol}&id=${asset.id}`,
      "_blank"
    );
  };

  const stats = [
    {
      label: "Total Assets",
      value: assets.length.toString(),
      icon: Activity,
    },
    { label: "Asset Types", value: assetTypes.length.toString(), icon: Filter },
    {
      label: "Active Markets",
      value: filteredAssets.length.toString(),
      icon: TrendingUp,
    },
    {
      label: "Available 24/7",
      value: assets
        .filter(a => a.attributes.schedule === "24/7")
        .length.toString(),
      icon: Clock,
    },
  ];

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedAssetType, selectedSchedule, sortBy]);

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">Asset Launchpad</h1>
            <p className="text-muted-foreground">
              Discover and trade digital assets across multiple markets
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                      <Skeleton className="w-8 h-8 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : stats.map(stat => (
                <Card key={stat.label} className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>

      {/* Filters */}
      <Card className="glass">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              {isLoading ? (
                <>
                  <Skeleton className="h-10 flex-1 max-w-sm" />
                  <Skeleton className="h-10 w-40" />
                  <Skeleton className="h-10 w-48" />
                  <Skeleton className="h-10 w-32" />
                </>
              ) : (
                <>
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search assets..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select
                    value={selectedAssetType}
                    onValueChange={setSelectedAssetType}
                  >
                    <SelectTrigger className="w-40">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Asset Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {assetTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedSchedule}
                    onValueChange={setSelectedSchedule}
                  >
                    <SelectTrigger className="w-48">
                      <Clock className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Schedules</SelectItem>
                      {schedules.map(schedule => (
                        <SelectItem key={schedule} value={schedule}>
                          {schedule}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="symbol">Symbol</SelectItem>
                      <SelectItem value="type">Type</SelectItem>
                      <SelectItem value="quote">Quote</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <Card key={i} className="glass">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : currentAssets.length === 0 ? (
        <Card className="glass">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No assets found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentAssets.map(asset => (
            <AssetCard
              key={asset.attributes.contract_id || asset.attributes.symbol}
              asset={asset}
              onClick={() => handleAssetClick(asset)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNumber)}
                      isActive={currentPage === pageNumber}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Launchpad;
