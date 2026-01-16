import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService, type ProductsParams, type ProductReview } from '../services';
import { queryKeys } from '../lib/queryClient';

export const useProducts = (params?: ProductsParams) => {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => productService.getProducts(params),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
  });
};

export const useTrendingProducts = () => {
  return useQuery({
    queryKey: queryKeys.products.trending,
    queryFn: () => productService.getTrendingProducts(),
  });
};

export const useBestSellers = () => {
  return useQuery({
    queryKey: queryKeys.products.bestSellers,
    queryFn: () => productService.getBestSellers(),
  });
};

export const useNewArrivals = () => {
  return useQuery({
    queryKey: queryKeys.products.newArrivals,
    queryFn: () => productService.getNewArrivals(),
  });
};

export const useRelatedProducts = (productId: string) => {
  return useQuery({
    queryKey: queryKeys.products.related(productId),
    queryFn: () => productService.getRelatedProducts(productId),
    enabled: !!productId,
  });
};

export const useProductReviews = (productId: string, page?: number) => {
  return useQuery({
    queryKey: [...queryKeys.products.reviews(productId), page],
    queryFn: () => productService.getProductReviews(productId, page),
    enabled: !!productId,
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: queryKeys.products.search(query),
    queryFn: () => productService.searchProducts(query),
    enabled: query.length >= 2,
  });
};

export const useSubmitReview = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { rating: number; title: string; comment: string }) =>
      productService.submitReview(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.reviews(productId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(productId) });
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => productService.getCategories(),
  });
};
