from __future__ import annotations

import math
from dataclasses import dataclass

import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Ellipse, FancyArrowPatch, Rectangle


@dataclass(frozen=True)
class Actor:
    name: str
    x: float
    y: float


@dataclass(frozen=True)
class UseCase:
    key: str
    name: str
    x: float
    y: float
    w: float = 24.0
    h: float = 8.0


def draw_actor(ax: plt.Axes, actor: Actor) -> None:
    head = Circle((actor.x, actor.y + 3.8), 1.1, fill=False, linewidth=1.4, edgecolor="black")
    ax.add_patch(head)
    ax.plot([actor.x, actor.x], [actor.y + 2.7, actor.y - 1.8], color="black", linewidth=1.4)
    ax.plot([actor.x - 2.2, actor.x + 2.2], [actor.y + 1.0, actor.y + 1.0], color="black", linewidth=1.4)
    ax.plot([actor.x, actor.x - 2.0], [actor.y - 1.8, actor.y - 4.8], color="black", linewidth=1.4)
    ax.plot([actor.x, actor.x + 2.0], [actor.y - 1.8, actor.y - 4.8], color="black", linewidth=1.4)
    ax.text(actor.x, actor.y - 6.4, actor.name, ha="center", va="top", fontsize=10, fontweight="bold")


def draw_use_case(ax: plt.Axes, uc: UseCase, bold: bool = False) -> None:
    ellipse = Ellipse((uc.x, uc.y), uc.w, uc.h, fill=False, linewidth=1.25, edgecolor="black")
    ax.add_patch(ellipse)
    ax.text(
        uc.x,
        uc.y,
        uc.name,
        ha="center",
        va="center",
        fontsize=9.5,
        fontweight="bold" if bold else "normal",
    )


def unit_vector(start: tuple[float, float], end: tuple[float, float]) -> tuple[float, float]:
    dx = end[0] - start[0]
    dy = end[1] - start[1]
    length = math.hypot(dx, dy)
    if length == 0:
        return (0.0, 0.0)
    return (dx / length, dy / length)


def ellipse_edge_point(src: UseCase, dst: UseCase) -> tuple[float, float]:
    ux, uy = unit_vector((src.x, src.y), (dst.x, dst.y))
    return (src.x + ux * (src.w / 2 - 0.5), src.y + uy * (src.h / 2 - 0.2))


def connect_association(ax: plt.Axes, start: tuple[float, float], end: tuple[float, float]) -> None:
    ax.plot([start[0], end[0]], [start[1], end[1]], color="black", linewidth=1.0)


def connect_relation(
    ax: plt.Axes,
    src: UseCase,
    dst: UseCase,
    label: str,
    rad: float = 0.0,
    text_dx: float = 0.0,
    text_dy: float = 0.0,
) -> None:
    start = ellipse_edge_point(src, dst)
    end = ellipse_edge_point(dst, src)
    arrow = FancyArrowPatch(
        posA=start,
        posB=end,
        connectionstyle=f"arc3,rad={rad}",
        arrowstyle="-|>",
        mutation_scale=12,
        linewidth=1.0,
        linestyle=(0, (5, 3)),
        color="black",
    )
    ax.add_patch(arrow)
    mid_x = (start[0] + end[0]) / 2 + text_dx
    mid_y = (start[1] + end[1]) / 2 + text_dy
    ax.text(mid_x, mid_y, label, fontsize=8.3, ha="center", va="center")


def main() -> None:
    fig, ax = plt.subplots(figsize=(24, 14))
    ax.set_xlim(0, 220)
    ax.set_ylim(0, 140)
    ax.axis("off")

    boundary = Rectangle((40, 10), 140, 120, fill=False, linewidth=1.7, edgecolor="black")
    ax.add_patch(boundary)
    ax.text(43, 127, "AYBUStore Platform", fontsize=14, fontweight="bold", va="bottom")

    # Primary use cases (high-level)
    uc_access = UseCase("UC-01", "UC-01  User Access Management", 90, 112)
    uc_discovery = UseCase("UC-02", "UC-02  Product Discovery", 90, 90)
    uc_fulfillment = UseCase("UC-03", "UC-03  Order Fulfillment", 90, 68)
    uc_support = UseCase("UC-04", "UC-04  Tracking & Support", 90, 46)
    uc_admin = UseCase("UC-05", "UC-05  Backoffice Operations", 90, 24)

    primary = [uc_access, uc_discovery, uc_fulfillment, uc_support, uc_admin]
    for uc in primary:
        draw_use_case(ax, uc, bold=True)

    # Secondary use cases (decomposed)
    secondary = [
        UseCase("UC-01.1", "UC-01.1  Register / Login", 145, 118, 22, 7),
        UseCase("UC-01.2", "UC-01.2  Verify OTP", 145, 106, 22, 7),
        UseCase("UC-02.1", "UC-02.1  Search Catalog", 145, 95, 22, 7),
        UseCase("UC-02.2", "UC-02.2  AI Recommendations", 145, 84, 22, 7),
        UseCase("UC-02.3", "UC-02.3  Customize Merchandise", 145, 73, 24, 7),
        UseCase("UC-03.1", "UC-03.1  Manage Cart", 145, 62, 20, 7),
        UseCase("UC-03.2", "UC-03.2  Checkout & Payment", 145, 52, 24, 7),
        UseCase("UC-03.3", "UC-03.3  Campus Route Planning", 145, 42, 24, 7),
        UseCase("UC-04.1", "UC-04.1  Real-time Tracking", 145, 32, 22, 7),
        UseCase("UC-04.2", "UC-04.2  Ticket / AI Support", 145, 22, 22, 7),
        UseCase("UC-05.1", "UC-05.1  Inventory & Catalog", 65, 24, 22, 7),
        UseCase("UC-05.2", "UC-05.2  Order & Rule Admin", 65, 14, 22, 7),
    ]
    uc_map = {u.key: u for u in secondary}
    for uc in secondary:
        draw_use_case(ax, uc)

    actors = {
        "student": Actor("Student / Staff", 15, 90),
        "admin": Actor("Admin", 15, 25),
        "logistics": Actor("Logistics Coordinator", 205, 58),
        "otp": Actor("SIS / OTP Service", 205, 110),
        "notify": Actor("Notification Service", 205, 34),
        "ai": Actor("AI Engine", 205, 82),
    }
    for actor in actors.values():
        draw_actor(ax, actor)

    # Actors connect to primary use-cases only (clean and readable)
    connect_association(ax, (actors["student"].x + 3, actors["student"].y + 3), (uc_access.x - 12, uc_access.y))
    connect_association(ax, (actors["student"].x + 3, actors["student"].y), (uc_discovery.x - 12, uc_discovery.y))
    connect_association(ax, (actors["student"].x + 3, actors["student"].y - 3), (uc_fulfillment.x - 12, uc_fulfillment.y))
    connect_association(ax, (actors["student"].x + 3, actors["student"].y - 6), (uc_support.x - 12, uc_support.y))
    connect_association(ax, (actors["admin"].x + 3, actors["admin"].y), (uc_admin.x - 12, uc_admin.y))

    connect_association(ax, (actors["logistics"].x - 3, actors["logistics"].y), (uc_fulfillment.x + 12, uc_fulfillment.y))
    connect_association(ax, (actors["otp"].x - 3, actors["otp"].y), (uc_map["UC-01.2"].x + 11, uc_map["UC-01.2"].y))
    connect_association(ax, (actors["notify"].x - 3, actors["notify"].y), (uc_map["UC-04.1"].x + 11, uc_map["UC-04.1"].y))
    connect_association(ax, (actors["ai"].x - 3, actors["ai"].y), (uc_map["UC-02.2"].x + 11, uc_map["UC-02.2"].y))
    connect_association(ax, (actors["ai"].x - 3, actors["ai"].y - 6), (uc_map["UC-04.2"].x + 11, uc_map["UC-04.2"].y))

    # Include decomposition from primary use-cases
    connect_relation(ax, uc_access, uc_map["UC-01.1"], "<<include>>", text_dy=1.8)
    connect_relation(ax, uc_access, uc_map["UC-01.2"], "<<include>>", text_dy=-1.4)

    connect_relation(ax, uc_discovery, uc_map["UC-02.1"], "<<include>>", text_dy=1.5)
    connect_relation(ax, uc_discovery, uc_map["UC-02.2"], "<<extend>>", rad=-0.08, text_dy=-1.5)
    connect_relation(ax, uc_discovery, uc_map["UC-02.3"], "<<extend>>", rad=-0.12, text_dy=-2.0)

    connect_relation(ax, uc_fulfillment, uc_map["UC-03.1"], "<<include>>", text_dy=1.2)
    connect_relation(ax, uc_fulfillment, uc_map["UC-03.2"], "<<include>>", text_dy=0.2)
    connect_relation(ax, uc_fulfillment, uc_map["UC-03.3"], "<<include>>", text_dy=-1.2)

    connect_relation(ax, uc_support, uc_map["UC-04.1"], "<<include>>", text_dy=1.2)
    connect_relation(ax, uc_support, uc_map["UC-04.2"], "<<extend>>", rad=-0.08, text_dy=-1.0)

    connect_relation(ax, uc_admin, uc_map["UC-05.1"], "<<include>>", text_dx=-1.0, text_dy=1.0)
    connect_relation(ax, uc_admin, uc_map["UC-05.2"], "<<include>>", text_dx=-1.0, text_dy=-1.5)
    connect_relation(ax, uc_map["UC-05.2"], uc_map["UC-03.3"], "<<include>>", rad=0.14, text_dy=1.4)

    ax.set_title("AYBUStore - Enterprise Use Case Diagram (Revised)", fontsize=16, fontweight="bold", pad=12)

    output_base = "diagrams_aybustore/use_case_diagram"
    fig.savefig(f"{output_base}.svg", bbox_inches="tight")
    fig.savefig(f"{output_base}.pdf", dpi=300, bbox_inches="tight")
    fig.savefig(f"{output_base}.png", dpi=300, bbox_inches="tight")
    plt.close(fig)


if __name__ == "__main__":
    main()
