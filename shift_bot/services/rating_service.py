"""
Рейтинги продавцов и точек по средней выручке, детализация по продавцу/точке.
"""
from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass
from datetime import date

from sqlalchemy.ext.asyncio import AsyncSession

from core.models.seller import Seller
from core.models.shift import Shift
from core.models.shop import Shop
from repositories import shift_repo


@dataclass
class SellerRatingRow:
    """Строка рейтинга продавца: продавец, средняя выручка, количество смен."""
    seller: Seller
    avg_revenue: float
    shifts_count: int
    total_revenue: float


@dataclass
class ShopRatingRow:
    """Строка рейтинга точки: точка, средняя выручка, количество смен."""
    shop: Shop
    avg_revenue: float
    shifts_count: int
    total_revenue: float


async def get_seller_rating(session: AsyncSession) -> list[SellerRatingRow]:
    """Рейтинг продавцов по средней выручке (у кого есть хотя бы одна закрытая смена с отчётом)."""
    shifts = await shift_repo.get_all_closed_shifts_with_report(session)
    by_seller: dict[int, list[float]] = defaultdict(list)
    seller_objects: dict[int, Seller] = {}
    for s in shifts:
        if not s.report:
            continue
        by_seller[s.seller_id].append(s.report.revenue)
        if s.seller and s.seller_id not in seller_objects:
            seller_objects[s.seller_id] = s.seller
    rows = []
    for sid, revenues in by_seller.items():
        seller = seller_objects.get(sid)
        if not seller:
            continue
        total = sum(revenues)
        rows.append(SellerRatingRow(
            seller=seller,
            avg_revenue=total / len(revenues),
            shifts_count=len(revenues),
            total_revenue=total,
        ))
    rows.sort(key=lambda r: r.avg_revenue, reverse=True)
    return rows


async def get_shop_rating(session: AsyncSession) -> list[ShopRatingRow]:
    """Рейтинг точек по средней выручке."""
    shifts = await shift_repo.get_all_closed_shifts_with_report(session)
    by_shop: dict[int, list[float]] = defaultdict(list)
    shop_objects: dict[int, Shop] = {}
    for s in shifts:
        if not s.report:
            continue
        by_shop[s.shop_id].append(s.report.revenue)
        if s.shop and s.shop_id not in shop_objects:
            shop_objects[s.shop_id] = s.shop
    rows = []
    for shop_id, revenues in by_shop.items():
        shop = shop_objects.get(shop_id)
        if not shop:
            continue
        total = sum(revenues)
        rows.append(ShopRatingRow(
            shop=shop,
            avg_revenue=total / len(revenues),
            shifts_count=len(revenues),
            total_revenue=total,
        ))
    rows.sort(key=lambda r: r.avg_revenue, reverse=True)
    return rows


async def get_seller_shifts_detail(
    session: AsyncSession, seller_id: int
) -> list[Shift]:
    """Все закрытые смены продавца с отчётом: дата, точка, выручка."""
    return await shift_repo.get_closed_shifts_by_seller(session, seller_id)


async def get_shop_shifts_detail(
    session: AsyncSession, shop_id: int
) -> list[Shift]:
    """Все закрытые смены по точке: дата, кто работал, выручка."""
    return await shift_repo.get_closed_shifts_by_shop(session, shop_id)
